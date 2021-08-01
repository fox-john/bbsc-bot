import { Client, Collection, Guild, StreamDispatcher, VoiceConnection } from 'discord.js';
import AmongUsGame from './among-us/AmongUsGame';
import Sequelizer from './Sequelizer';
import WebSocketServer from './WebSocketServer';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
require('dotenv').config();

export class Bot extends Client {
    public commands: Collection<string, any> = new Collection();
    public bbscDiscord: Guild;
    public currentVoiceConnection: VoiceConnection = null;
    public voiceConnectionDispatcher: StreamDispatcher = null;
    public static amongUsGame: AmongUsGame|undefined;
    public sequelizer: Sequelizer;

    constructor() {
        super();

        this.on('ready', () => {
            this.init();
        })
    }

    async init (): Promise<void> {
/*         try {
            this.sequelizer = new Sequelizer();
            await this.sequelizer.sequelize.authenticate();
            console.log('Connection has been established successfully.');

            const result = await this.sequelizer.sequelize.query('SELECT * from users');
            console.log(result);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        } */


        // register all commands
        const commandsDir = path.resolve(__dirname, '..', 'commands');

        this.bbscDiscord = await this.guilds.cache.get(process.env.BBSC_GUILD_ID).fetch();
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
