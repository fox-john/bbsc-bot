import { Bot } from '../Bot';
import { Message, GuildEmoji, TextChannel } from 'discord.js';

module.exports = {
    name: 'clean',
    description: 'clean messages from chat',
    args: true,

    execute(messageSended: Message, params: Array<string>) {
        if (!messageSended.member.hasPermission('ADMINISTRATOR')) {
            const emojiThink: GuildEmoji = Bot.client.emojis.cache.find(emoji => emoji.name === 'think');
            return messageSended.reply(`Tu me prends pour un con ? Tu n\'est pas Administrateur ! ${emojiThink}`);
        }

        const quantity: number = params[0] ? parseInt(params[0]) : 1;

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