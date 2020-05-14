import { Message, GuildEmoji, DMChannel, Client } from "discord.js";
import { Bot } from "../Bot";

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
            
            const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.alias && cmd.alias.includes(commandName));
            
            if (!command) return message.reply('Désolé, cette commande n\'existe pas.');

            try {
                command.execute(bot, message, params);
            } catch (error) {
                console.error(error);
                const emojiBwa: GuildEmoji = this.client.emojis.cache.find(emoji => emoji.name === 'bwa');
                message.reply(`Désolé, Il y a eu une erreur en executant cette commande ${emojiBwa}`);
            }
        }
    }
};