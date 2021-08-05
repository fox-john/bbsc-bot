import chalk from "chalk";
import { Bot } from "../../classes/discord/Bot";
import WebSocketServer from "../../classes/WebSocketServer";

module.exports = {
    name: 'connectCode',

    execute: (bot: Bot, event: WebSocketServer, params: any) => {
        if (params !== 'BBSC') {
            event.close();
        } else {
            console.log(chalk.blueBright("Among Us Capture is connected to Discord Bot"));
        }
    }
}
