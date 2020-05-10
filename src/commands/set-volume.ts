import { Bot } from '../Bot';
import { Message } from 'discord.js';

module.exports = {
    name: 'setvolume',
    description: 'Set play volume',
    args: true,

    execute(bot: Bot, messageSended: Message, params: Array<string>) {
        const volume: number = params[0] ? parseInt(params[0]) : 0.5;
        
        if (bot.voiceConnectionDispatcher !== null) {
            const finalVolume: number = volume / 100;

            if (finalVolume > 0.0 && finalVolume <= 1.0) {
                console.log(finalVolume);
                bot.voiceConnectionDispatcher.setVolume(finalVolume);
                console.log(bot.voiceConnectionDispatcher.volume);
            } else {
                messageSended.reply('Le volume est trop bas ou trop élevé ! (valeur entre 1 et 10)');
            }
        }
    },
};