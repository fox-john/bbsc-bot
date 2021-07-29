import chalk from 'chalk';
import path from 'path';
import SocketIO from 'socket.io';
import { Bot } from './Bot';
const fs = require('fs');

export default class WebSocketServer extends SocketIO {
    constructor(bot: Bot) {
        super();

        // register all WebSocket events
        const webSocketEventsDir = path.resolve(__dirname, '..', 'events/websocket');
        const webSocketEventFiles = fs.readdirSync(webSocketEventsDir).filter(file => file.endsWith('.ts'));

        super.on('connection', (socket) => {
            for (const file of webSocketEventFiles) {
                const event = require(`${webSocketEventsDir}/${file}`);

                socket.on(event.name, event.execute.bind(null, bot, this));
            }
        });

        super.listen(8123);

        console.log(chalk.bgGreen.black(' websocket server listen to http://www.jrw-prod.fr:8123 '));
    }
}
