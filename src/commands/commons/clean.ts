import { Message, GuildEmoji, TextChannel } from 'discord.js';
import { Bot } from '../../classes/Bot';

module.exports = {
    name: 'clean',
    alias: [],
    description: '**/clean [quantité]**: Suppprimer les X derniers messages',
    isInternal: false,
    isAdmin: true,
    isVoiceCommand: false,
    args: true,

    execute(bot: Bot, messageSended: Message, params: Array<string>) {
        const quantity: number = params[0] ? parseInt(params[0]) : 3;

        if (quantity > 100) {
            return messageSended.reply('Vous ne pouvez pas supprimer plus de 100 messages à la fois !').then((message) => {
                setTimeout(() => {
                    message.delete();
                }, 3000);
            })
        }

        const channel: TextChannel = messageSended.channel as TextChannel;
        const messagesToDelete: Array<Message> = [];

        channel.send(`Suppression de ${quantity} message(s) En cours...`).then(() => {
            channel.messages.fetch({ limit: quantity }).then((messages) => {
                messages.forEach((message) => {
                    if (!message.pinned) {
                        messagesToDelete.push(message);
                    }
                });
    
                channel.bulkDelete(messagesToDelete).catch(() => {
                    messagesToDelete.forEach((message) => {
                        if (!message.deleted) {
                            message.delete();
                        }
                    })
                }).finally(() => {
                    channel.send(`Suppression de ${quantity} message(s) terminé !`).then((deleteMessage) => {
                        setTimeout(() => {
                            deleteMessage.delete();
                        }, 3000);
                    });
                })
            });
        })
    }
};