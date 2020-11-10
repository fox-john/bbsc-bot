import GameState from '../../enums/among-us/GameState';
import Player from '../../classes/among-us/Player';
import PlayerColor from '../../enums/among-us/PlayerColor';
import PlayerAction from '../../enums/among-us/PlayerAction';
import PlayerState from '../../enums/among-us/PlayerState';
import { Bot } from '../Bot';
import { GuildMember } from 'discord.js';
import PlayerType from '../../enums/among-us/PlayerType';

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

    public launchGame(): void {
        this.state = GameState.MENU;
        this.bot.logger.log('info', 'AmongUsCapture: game has launched');
    }

    public async launchLobby(): Promise<void> {
        this.state = GameState.LOBBY;
        this.bot.commands.get('play-sound').execute(this.bot, 'unmute.ogg');

        this.players.forEach((player) => {
            player.isDead = PlayerState.ALIVE;
            player.mute(false);
        });

        this.bot.logger.log('info', 'AmongUsCapture: Lobby created');
    }

    public addPlayer(playerInfos: Record<string, any>, member?: GuildMember): void {
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

            this.bot.logger.log('info', `AmongUsCapture: player ${playerInfos.name} added`);
        }
    }

    public removePlayer(playerInfos: Record<string, any>): void {
        if (Bot.amongUsGame.players.has(playerInfos.Name)) {
            this.players.get(playerInfos.Name).mute(false);
            this.players.delete(playerInfos.Name);

            this.bot.logger.log('info', `AmongUsCapture: player ${playerInfos.name} removed`);
        }
    }

    public async launchParty(): Promise<void> {
        this.state = GameState.TASKS;
        this.bot.commands.get('play-sound').execute(this.bot, 'mute.ogg');

        this.players.forEach(async (player) => {
            player.mute(true);
        });

        this.bot.logger.log('info', 'AmongUsCapture: the game is under party mode');
    }

    public async launchDiscussion(): Promise<void> {
        this.state = GameState.DISCUSS;
        this.bot.commands.get('play-sound').execute(this.bot, 'unmute.ogg');

        this.players.forEach((player) => {
            if (!player.isDead) {
                player.mute(false);
            }
        });

        this.bot.logger.log('info', 'AmongUsCapture: the game is under discussion mode');
    }

    public killPlayer(playerName: string): void {
        this.players.get(playerName).isDead = PlayerState.DEAD;

        this.bot.logger.log('info', `AmongUsCapture: player ${playerName} are killed`);
    }
}
