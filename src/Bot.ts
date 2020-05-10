import { Client, User, VoiceChannel, TextChannel, VoiceConnection, StreamDispatcher, Collection } from 'discord.js';
import { EmbedMessage, EmbedType } from './EmbedMessage';

const fs = require('fs');
const path = require('path');

require('dotenv').config();

export class Bot extends Client {
    private logChannel: TextChannel;

    public commands: Collection<string, any> = new Collection();
    public currentVoiceConnection: VoiceConnection = null;
    public voiceConnectionDispatcher: StreamDispatcher = null;

    constructor() {
        super();

        // register all commands
        const commandsDir = path.resolve(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const command = require(`${commandsDir}/${file}`);
            this.commands.set(command.name, command);
        }

        // register all events
        const eventsDir = path.resolve(__dirname, 'events');
        const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.ts'));

        for (const file of eventFiles) {
            const event = require(`${eventsDir}/${file}`);
            super.on(event.name, event.execute.bind(null, this))
        }
    }

    async getUserById(userId): Promise<User> {
        return await this.users.fetch(userId);
    }

    async getVoiceChannelById(channelId): Promise<VoiceChannel> {
        return this.channels.fetch(channelId) as unknown as VoiceChannel;
    }

    async writeLog(type: EmbedType, user: User, message: String = '') {
        if (typeof this.logChannel === 'undefined') {
            this.logChannel = await this.channels.fetch(process.env.LOG_CHANNEL_ID) as unknown as TextChannel;
        }

        const embedMessage: EmbedMessage = new EmbedMessage(type, user, message);

        this.logChannel.send(embedMessage);
    }
}