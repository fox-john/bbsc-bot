import { Bot } from '../Bot';
import { Message, GuildEmoji } from 'discord.js';

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
        messageSended.channel.bulkDelete(quantity).catch(() => {
            messageSended.channel.send(`Suppression de ${quantity} message(s) En tâche de fond...`);

            setTimeout(() => {
                messageSended.channel.messages.fetch({ limit: quantity }).then((messages) => {
                    messages.forEach((message) => {
                        messageSended.channel.messages.delete(message);
                    });
                });
            }, 3000);
        }).finally(async () => {
            const finishMessage: Message = await messageSended.channel.send(`Suppression de ${quantity} message(s) terminé !`);
            setTimeout(() => {
                finishMessage.delete();
             }, 3000);
        });
    }
};