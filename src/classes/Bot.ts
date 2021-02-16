import { Client, VoiceConnection, StreamDispatcher, Collection, Guild } from 'discord.js';
import WebSocketServer from './WebSocketServer';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
require('dotenv').config();
import AmongUsGame from './among-us/AmongUsGame';

export class Bot extends Client {
    public commands: Collection<string, any> = new Collection();
    public bbscDiscord: Guild;
    public currentVoiceConnection: VoiceConnection = null;
    public voiceConnectionDispatcher: StreamDispatcher = null;

    public static amongUsGame: AmongUsGame|undefined;

    constructor() {
        super();

        this.on('ready', () => {
            this.init();
        }) 
    }

    async init (): Promise<void> {
        // register all commands
        const commandsDir = path.resolve(__dirname, '..', 'commands');

        this.bbscDiscord = this.guilds.cache.get(process.env.BBSC_GUILD_ID);
        this.bbscDiscord.members.fetch();

        glob(`${commandsDir}/**/*.ts`, (err, commandFiles) => {
            commandFiles.forEach((file) => {
                const command = require(file);
                this.commands.set(command.name, command);
            })

            new WebSocketServer(this);
        });

        // register all discord events
        const discordEventsDir = path.resolve(__dirname, '..', 'events/discord-js');
        const discordEventFiles = fs.readdirSync(discordEventsDir).filter(file => file.endsWith('.ts'));

        for (const file of discordEventFiles) {
            const event = require(`${discordEventsDir}/${file}`);

            super.on(event.name, event.execute.bind(null, this));
        }
    }
}