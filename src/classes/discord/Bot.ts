import { Client, Collection, Guild, StreamDispatcher, VoiceConnection } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import glob from 'glob';
import * as path from 'path';
import AmongUsGame from '../among-us/AmongUsGame';
import WebSocketServer from '../WebSocketServer';
import mariadb, { Pool } from 'mariadb';

dotenv.config()

export class Bot extends Client {
    public commands: Collection<string, any> = new Collection();
    public bbscDiscord: Guild;
    public currentVoiceConnection: VoiceConnection = null;
    public voiceConnectionDispatcher: StreamDispatcher = null;
    public static amongUsGame: AmongUsGame|undefined;
    public static mariaDbConnection: Pool;

    constructor() {
        super();

        this.on('ready', () => {
            this.init();
        })

/*         if (!Bot.mariaDbConnection) {
            Bot.mariaDbConnection = mariadb.createPool({
                host: process.env.MARIADB_HOST,
                user: process.env.MARIADB_USER,
                password: process.env.MARIADB_PASSWORD,
                connectionLimit: 5
            });
        } */
    }

    async init (): Promise<void> {

        /* const connection = await Bot.mariaDbConnection.getConnection();
        await connection.query("use discord;");
        const rows = await connection.query("");
        console.log(rows);
        connection.end(); */

        // register all commands
        const commandsDir = path.resolve(__dirname, '../..', 'commands');

        this.bbscDiscord = await this.guilds.cache.get(process.env.BBSC_GUILD_ID).fetch();
        this.bbscDiscord.members.fetch();

        glob(`${commandsDir}/**/*.ts`, (_error: Error, commandFiles: Array<string>) => {
            commandFiles.forEach((file) => {
                const command = require(file);
                this.commands.set(command.name, command);
            })

            new WebSocketServer(this);
        });

        // register all discord events
        const discordEventsDir = path.resolve(__dirname, '../..', 'events/discord-js');
        const discordEventFiles = fs.readdirSync(discordEventsDir).filter(file => file.endsWith('.ts'));

        for (const file of discordEventFiles) {
            const event = require(`${discordEventsDir}/${file}`);

            super.on(event.name, event.execute.bind(null, this));
        }
    }
}
