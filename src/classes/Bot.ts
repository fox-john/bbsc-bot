import { Client, User, VoiceChannel, TextChannel, VoiceConnection, StreamDispatcher, Collection } from 'discord.js';
import { EmbedMessage, EmbedType } from './EmbedMessage';

const io = require('socket.io')();
const fs = require('fs');
const path = require('path');
const glob = require('glob');
require('dotenv').config();
import BotLogger from './BotLogger';
import { Logger } from 'winston';

export class Bot extends Client {
    private logChannel: TextChannel;

    public commands: Collection<string, any> = new Collection();
    public currentVoiceConnection: VoiceConnection = null;
    public voiceConnectionDispatcher: StreamDispatcher = null;
    public logger: Logger;

    constructor() {
        super();

        process.on('unhandledRejection', (error) => {
            this.logger.log('error', 'Unhandled Rejection: ' + error);
            console.error(error);
        });

        process.on('uncaughtException', (error) => {
            this.logger.log('error', 'Uncaught Exception: ' + error);
            console.error(error);
        });

        this.logger = new BotLogger().start();

        // register all commands
        const commandsDir = path.resolve(__dirname, '..', 'commands');

        glob(`${commandsDir}/**/*.ts`, (err, commandFiles) => {
            commandFiles.forEach((file) => {
                const command = require(file);
                this.commands.set(command.name, command);
            })
        });

        // register all events
        const eventsDir = path.resolve(__dirname, '..', 'events');
        const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.ts'));

        for (const file of eventFiles) {
            const event = require(`${eventsDir}/${file}`);

            super.on(event.name, event.execute.bind(null, this));
        }

/*         io.on('connection', client => console.log(client)); */
    io.on('connection', (socket) => {
        socket.on('connectCode', code => console.log(code));
        socket.on('state', state => console.log(state));
        socket.on('player', player => console.log(player));
        socket.on('lobby', lobby => console.log(lobby));
    });
    io.listen(8123);
        this.logger.log('info', 'bot has started');
    }

    async writeLog(type: EmbedType, user: User, message = ''): Promise<void> {
        if (typeof this.logChannel === 'undefined') {
            this.logChannel = await this.channels.fetch(process.env.LOG_CHANNEL_ID) as unknown as TextChannel;
        }

        const embedMessage: EmbedMessage = new EmbedMessage(type, message, user);
        this.logChannel.send(embedMessage);

        const cleanedMessage = message.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\*/g,'');
        this.logger.log('info', cleanedMessage);
    }
}