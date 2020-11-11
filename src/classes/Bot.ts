import { Client, VoiceConnection, StreamDispatcher, Collection } from 'discord.js';
import WebSocketServer from './WebSocketServer';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
require('dotenv').config();
import BotLogger from './BotLogger';
import { Logger } from 'winston';
import AmongUsGame from './among-us/AmongUsGame';

export class Bot extends Client {
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

        new WebSocketServer(this);

        this.logger.log('info', 'bot ready');
    }

    async writeLog(type: string, message = ''): Promise<void> {
        const cleanedMessage = message.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\*/g,'');

        this.logger.log(type, cleanedMessage);
    }
}