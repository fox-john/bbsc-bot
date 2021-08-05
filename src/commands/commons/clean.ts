import { Message, TextChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'clean',
    commands: ['clean', 'clear'],
    description: {
        title: 'Suppprimer les X derniers messages',
        args: [
            {
                name: 'quantity [0-100]',
                required: false,
            }
        ]
    },
    minLevel: UserLevel.MODERATOR,
    isVoiceCommand: false,
    args: true,

    execute(bot: Bot, messageSended: Message, params: Array<string>) {
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
        let quantityDeleted = 0;

        channel.messages.fetch({ limit: quantity + 1 }).then((messages) => {
            messages.forEach((message) => {
                if (!message.pinned) {
                    messagesToDelete.push(message);
                    quantityDeleted++;
                }
        });

        channel.bulkDelete(messagesToDelete).catch(() => {
                messagesToDelete.forEach((message) => {
                    if (!message.deleted) {
                        message.delete();
                    }
                })
            }).finally(() => {
                channel.send(`${quantityDeleted} message(s) viennent d'être supprimé !`).then((deleteMessage) => {
                    setTimeout(() => {
                        deleteMessage.delete();
                    }, 3000);
                });
            })
        });
    }
};
