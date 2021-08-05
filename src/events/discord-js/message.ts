import { DMChannel, GuildEmoji, Message } from "discord.js";
import { Bot } from "../../classes/discord/Bot";
import UserLevel from "../../enums/UserLevel";

module.exports = {
    name: 'message',

    execute: (bot: Bot, message: Message) => {
        if (message.author.bot) return;

        if (message.content.startsWith('/')) {
            if (message.channel instanceof DMChannel) {
                return message.reply('Vous ne pouvez pas executer de commande en message privé !');
            }

            const params: Array<string> = message.content.slice(1).split(/ +/);
            const commandName: string = params.shift().toLowerCase();

            const command = bot.commands.find(cmd => cmd.commands && cmd.commands.includes(commandName));

            if (!command) return message.reply('Désolé, cette commande n\'existe pas.');

            try {
                if (!message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                    if (command.minLevel === UserLevel.ADMIN) {
                        const emojiThink: GuildEmoji = bot.emojis.cache.find(emoji => emoji.name === 'think');
                        return message.reply(`Vous devez être administrateur pour utiliser cette commande ${emojiThink}`);
                    }

                    if (command.minLevel === UserLevel.MODERATOR && !message.member.roles.cache.has(process.env.MODERATOR_ROLE_ID)) {
                        const emojiThink: GuildEmoji = bot.emojis.cache.find(emoji => emoji.name === 'think');
                        return message.reply(`Vous devez être modérateur ou administrateur pour utiliser cette commande ${emojiThink}`);
                    }
                }

                if (command.isVoiceCommand && !message.member.voice.channelID) {
                    const emojiThink: GuildEmoji = bot.emojis.cache.find(emoji => emoji.name === 'think');
                    return message.reply(`Vous devez être connecté à un canal vocal pour utiliser cette commande ${emojiThink}`);
                }

                command.execute(bot, message, params);
            } catch (error) {
                const emojiBwa: GuildEmoji = bot.emojis.cache.find(emoji => emoji.name === 'bwa');
                message.reply(`Désolé, Il y a eu une erreur en executant cette commande ${emojiBwa}`);
                throw error;
            }
        }
    }
};
