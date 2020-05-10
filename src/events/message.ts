import { Message, GuildEmoji, DMChannel, Client } from "discord.js";
import { Bot } from '../Bot';

module.exports = {
    name: 'message',

    execute: (client: Client, message: Message) => {
        if (message.author.bot) return;
        
        if (message.content.startsWith('/')) {
            if (message.channel instanceof DMChannel) {
                return message.reply('Vous ne pouvez pas executer de commande en message privé !');
            }

            const params: Array<string> = message.content.slice(1).split(/ +/);
            const command: string = params.shift().toLowerCase();
            
            if (!Bot.commands.has(command)) return message.reply('Désolé, cette commande n\'existe pas.');

            try {
                Bot.commands.get(command).execute(message, params);
            } catch (error) {
                console.error(error);
                const emojiBwa: GuildEmoji = Bot.client.emojis.cache.find(emoji => emoji.name === 'bwa');
                message.reply(`Désolé, Il y a eu une erreur en executant cette commande ${emojiBwa}`);
            }
        }
    }
};