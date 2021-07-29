import AmongUsGame from '../../classes/among-us/AmongUsGame';
import { Bot } from '../../classes/Bot';
import WebSocketServer from '../../classes/WebSocketServer';
import GameState from '../../enums/among-us/GameState';

module.exports = {
    name: 'state',

    execute: (bot: Bot, event: WebSocketServer, params: any) => {
        const gameState = JSON.parse(params);

        if (!Bot.amongUsGame) {
            Bot.amongUsGame = new AmongUsGame(bot);
        }

        if (gameState === GameState.MENU) {
            Bot.amongUsGame.launchGame(bot);
        } else if (gameState === GameState.LOBBY) {
            Bot.amongUsGame.launchLobby(bot);
        } else if (gameState === GameState.TASKS) {
            Bot.amongUsGame.launchParty(bot);
        } else if (gameState === GameState.DISCUSS) {
            Bot.amongUsGame.launchDiscussion(bot);
        }
    }
}
