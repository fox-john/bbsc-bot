import GameState from '../../enums/among-us/GameState';
import Player from '../../classes/among-us/Player';
import PlayerColor from '../../enums/among-us/PlayerColor';
import PlayerAction from '../../enums/among-us/PlayerAction';
import PlayerState from '../../enums/among-us/PlayerState';
import { Bot } from '../Bot';
import { GuildMember } from 'discord.js';
import PlayerType from '../../enums/among-us/PlayerType';
import path from 'path';

const fs = require('fs');

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
        console.log('launchGame');
    }

    public launchLobby(): void {
        this.state = GameState.LOBBY;
        console.log('launchLobby');
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
    
            console.log(`player added: ${player.name}`);
        }
    }

    public removePlayer(playerInfos: Record<string, any>): void {
        if (Bot.amongUsGame.players.has(playerInfos.Name)) {
            this.players.delete(playerInfos.Name);
    
            console.log(`player removed: ${playerInfos.Name}`);
        }
    }

    public async launchParty(): Promise<void> {
        this.state = GameState.TASKS;

        if (this.bot.currentVoiceConnection) {
            if (this.bot.voiceConnectionDispatcher !== null) {
                await this.bot.voiceConnectionDispatcher.end();
            }

            this.bot.voiceConnectionDispatcher = this.bot.currentVoiceConnection.play(fs.createReadStream(path.resolve(__dirname, '../../static/audio', 'mute.ogg')), { type: 'ogg/opus' });
        }

        this.players.forEach(async (player) => {
            player.mute(true);
        });

        console.log('launchParty');
    }

    public async launchDiscussion(): Promise<void> {
        this.state = GameState.DISCUSS;

        if (this.bot.currentVoiceConnection) {
            if (this.bot.voiceConnectionDispatcher !== null) {
                await this.bot.voiceConnectionDispatcher.end();
            }

            this.bot.voiceConnectionDispatcher = this.bot.currentVoiceConnection.play(fs.createReadStream(path.resolve(__dirname, '../../static/audio', 'mute.ogg')), { type: 'ogg/opus' });
        }

        this.players.forEach((player) => {
            if (!player.isDead) {
                player.mute(false);
            }
        });

        console.log('launchDiscussion');
    }

    public killPlayer(playerName: string): void {
        this.players.get(playerName).isDead = PlayerState.DEAD;

        console.log(`player killed: ${playerName}`);
    }
}