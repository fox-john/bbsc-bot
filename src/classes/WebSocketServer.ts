import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { Server as SocketIO } from "socket.io";
import { Bot } from './discord/Bot';

export default class WebSocketServer extends SocketIO {
    public amongUsCaptureId: string;

    constructor(bot: Bot) {
        super({
            allowEIO3: true,
            cors: {
                methods: ["GET", "POST"]
            }
        })

        // register all WebSocket events
        const webSocketEventsDir = path.resolve(__dirname, '..', 'events/websocket');
        const webSocketEventFiles = fs.readdirSync(webSocketEventsDir).filter(file => file.endsWith('.ts'));

        super.on('connection', (socket) => {
            if (this.amongUsCaptureId != socket.id) {
                this.amongUsCaptureId = socket.id;

                for (const file of webSocketEventFiles) {
                    const event = require(`${webSocketEventsDir}/${file}`);

                    socket.on(event.name, event.execute.bind(null, bot, this));
                }
            }
        });

        super.listen(Number.parseInt(process.env.SOCKET_IO_PORT));

        console.log(chalk.bgGreen.black(`websocket server listen to ${process.env.DOMAIN_NAME}:${process.env.SOCKET_IO_PORT}`));
    }
}
