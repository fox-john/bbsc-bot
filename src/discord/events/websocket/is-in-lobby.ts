import chalk from "chalk";
import { Bot } from "../../classes/discord/Bot"
import WebSocketServer from "../../classes/WebSocketServer"
module.exports = {
    name: 'lobby',

    execute: (bot: Bot, event: WebSocketServer, params: any) => {
        console.log(`player is in lobby: ${params}`);
    }
}
