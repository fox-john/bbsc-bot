import { GuildMember } from 'discord.js';
import GameState from '../../enums/among-us/GameState';
import PlayerAction from '../../enums/among-us/PlayerAction';
import PlayerColor from '../../enums/among-us/PlayerColor';
import PlayerState from '../../enums/among-us/PlayerState';
import PlayerType from '../../enums/among-us/PlayerType';
import { Bot } from '../Bot';
import Player from './Player';

export default class AmongUsGame {
    private bot: Bot;
    private _state: GameState = GameState.MENU;
    private _players: Map<string, Player> = new Map();

    constructor(bot: Bot) {
        this.bot = bot;
    }

    public get state(): GameState { return this._state; }
    public set state(value: GameState) { this._state = value; }

    public get players():  Map<string, Player> { return this._players; }
    public set players(value:  Map<string, Player>) { this._players = value; }

    public launchGame(bot: Bot): void {
        this.state = GameState.MENU;
    }

    public async launchLobby(bot: Bot): Promise<void> {
        setTimeout(() => {
            this.state = GameState.LOBBY;

            this.bot.commands.get('play-internal-sound').execute(this.bot, 'unmute.ogg');

            this.players.forEach((player) => {
                player.isDead = PlayerState.ALIVE;
                player.mute(false);
            });
        }, this.state === GameState.DISCUSS ? 7000 : 0);
    }

    public addPlayer(bot: Bot, playerInfos: Record<string, any>, member?: GuildMember): void {
        if (!Bot.amongUsGame.players.has(playerInfos.Name)) {
            const player = new Player({
                member,
                type: member ? PlayerType.DISCORD : PlayerType.SIMPLE,
                name: playerInfos.Name,
                action: PlayerAction[`${playerInfos.Action}`],
                isDead: PlayerState[`${playerInfos.IsDead}`],
                color: PlayerColor[`${playerInfos.Color}`],
                disconnected: playerInfos.Disconnected
            });

            this.players.set(player.name, player);
        }
    }

    public removePlayer(bot: Bot, playerInfos: Record<string, any>): void {
        if (Bot.amongUsGame.players.has(playerInfos.Name)) {
            this.players.get(playerInfos.Name).mute(false);
            this.players.delete(playerInfos.Name);
        }
    }

    public async launchParty(bot: Bot): Promise<void> {
        setTimeout(() => {
            this.state = GameState.TASKS;
            this.bot.commands.get('play-internal-sound').execute(this.bot, 'mute.ogg');

            this.players.forEach(async (player) => {
                player.mute(true);
            });
        }, this.state === GameState.DISCUSS ? 7000 : 0);
    }

    public async launchDiscussion(bot: Bot): Promise<void> {
        this.state = GameState.DISCUSS;
        this.bot.commands.get('play-internal-sound').execute(this.bot, 'unmute.ogg');

        this.players.forEach((player) => {
            if (!player.isDead) {
                player.mute(false);
            }
        });
    }

    public killPlayer(bot: Bot, playerName: string): void {
        this.players.get(playerName).isDead = PlayerState.DEAD;
    }
}
