import { Client, User, TextChannel, VoiceConnection, StreamDispatcher, Collection, Guild } from 'discord.js';
import { EmbedMessage, EmbedType } from './EmbedMessage';
import WebSocketServer from './WebSocketServer';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
require('dotenv').config();
import BotLogger from './BotLogger';
import { Logger } from 'winston';
import AmongUsGame from './among-us/AmongUsGame';

export class Bot extends Client {
    private logChannel: TextChannel;
    private wsServer: WebSocketServer;

    public logger: Logger;

    public commands: Collection<string, any> = new Collection();

    public currentVoiceConnection: VoiceConnection = null;
    public voiceConnectionDispatcher: StreamDispatcher = null;

    public static amongUsGame: AmongUsGame|undefined;

    constructor() {
        super();

        this.logger = new BotLogger().start();

        this.on('ready', () => {
            this.init();
        }) 
    }

    async init (): Promise<void> {
        this.wsServer = new WebSocketServer(this);

        // register all commands
        const commandsDir = path.resolve(__dirname, '..', 'commands');

        glob(`${commandsDir}/**/*.ts`, (err, commandFiles) => {
            commandFiles.forEach((file) => {
                const command = require(file);
                this.commands.set(command.name, command);
            })
        });

        // register all discord events
        const discordEventsDir = path.resolve(__dirname, '..', 'events/discord-js');
        const discordEventFiles = fs.readdirSync(discordEventsDir).filter(file => file.endsWith('.ts'));

        for (const file of discordEventFiles) {
            const event = require(`${discordEventsDir}/${file}`);

            super.on(event.name, event.execute.bind(null, this));
        }

        this.logger.log('info', 'bot ready');
    }

    async writeLog(type: EmbedType, user: User, message = ''): Promise<void> {
        if (typeof this.logChannel === 'undefined') {
            this.logChannel = await this.channels.fetch(process.env.LOG_CHANNEL_ID) as unknown as TextChannel;
        }

        const embedMessage: EmbedMessage = new EmbedMessage(type, message, user);
        const cleanedMessage = message.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\*/g,'');

        this.logChannel.send(embedMessage);

        if (type === EmbedType.ERROR) {
            this.logger.log('error', cleanedMessage);
        } else {
            this.logger.log('info', cleanedMessage);
        }
    }
}