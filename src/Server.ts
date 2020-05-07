import { Client, User, VoiceChannel, TextChannel } from 'discord.js';
import { EventManager } from './EventManager';
import { EmbedMessage, EmbedType,  } from './EmbedMessage';

require('dotenv').config();

export class Server {
    private static client: Client;
    private static logChannel: TextChannel;

    static init() {
        this.client = new Client();
        this.client.login(process.env.TOKEN);

        new EventManager(this.client);
    };

    static async getUserById(userId): Promise<User> {
        return await this.client.users.fetch(userId);
    }

    static async getVoiceChannelById(channelId): Promise<VoiceChannel> {
        return await this.client.channels.fetch(channelId) as VoiceChannel;
    }

    static async writeLog(type: EmbedType, user: User, message: String = '') {
        if (typeof this.logChannel === 'undefined') {
            this.logChannel = await this.client.channels.fetch(process.env.LOG_CHANNEL_ID) as unknown as TextChannel;
        }

        const embedMessage = new EmbedMessage(type, user, message);
        
        this.logChannel.send(embedMessage);
    }

    static isMine(userId): Boolean{
        return userId == process.env.BBSC_BOT_ID;
    }

    static async bulkRemoveMessages(channel: TextChannel, quantity: number = 1) {
        channel.bulkDelete(quantity).catch(() => {
            channel.send(`Suppression de ${quantity} message(s) En tâche de fond...`);

            setTimeout(() => {
                channel.messages.fetch({ limit: quantity }).then((messages) => {
                    messages.forEach((message) => {
                        channel.messages.delete(message);
                    });
                });
            }, 1500);
        }).finally(() => {
            channel.send(`Suppression de ${quantity} message(s) terminé !`);
            setTimeout(() => {
                channel.bulkDelete(1);
             }, 1500)
        })
    }
}