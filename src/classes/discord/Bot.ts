import { Client, Collection, Guild, Intents } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import glob from 'glob';
import * as path from 'path';
import AmongUsGame from '../among-us/AmongUsGame';
import WebSocketServer from '../WebSocketServer';
import sequelize from '../../utils/database';
import { SlashCommandBuilder } from '@discordjs/builders';
import { createAudioPlayer } from '@discordjs/voice';

dotenv.config()

export class Bot extends Client {
    public commands: Collection<string, any> = new Collection();
    public bbscDiscord: Guild;
    public audioPlayer = createAudioPlayer();
    public static amongUsGame: AmongUsGame | undefined;

    constructor() {
        super({
            intents: new Intents([
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES
            ])
        });

        this.on('ready', () => {
            this.init();
        })
    }

    async init(): Promise<void> {
        await sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            }).catch((error) => {
                console.error('Unable to connect to the database:', error);
            });

        // register all commands
        const commandsDir = path.resolve(__dirname, '../..', 'commands');

        this.bbscDiscord = await this.guilds.cache.get(process.env.BBSC_GUILD_ID).fetch();


        glob(`${commandsDir}/**/*.ts`, (_error: Error, commandFiles: Array<string>) => {
            commandFiles.forEach((file) => {
                const command = require(file);
                this.commands.set(command.name, command);

                new SlashCommandBuilder()
                    .setName(command.name)
                    .setDescription(command.description.title)
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
