import { Message } from 'discord.js';
import { Bot } from '../../classes/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'set-volume',
    commands: ['set-volume', 'volume', 'vol'],
    exemple: '/volume [1-100]',
    description: 'Définir le volume du bot',
    minLevel: UserLevel.MODERATOR,
    isVoiceCommand: true,
    args: true,

    execute(bot: Bot, messageSended: Message, params: Array<string>) {
        const volume: number = params[0] ? parseInt(params[0]) : 0.5;

        if (bot.voiceConnectionDispatcher !== null) {
            const finalVolume: number = volume / 100;

            if (finalVolume > 0.0 && finalVolume <= 1.0) {
                bot.voiceConnectionDispatcher.setVolume(finalVolume);
            } else {
                messageSended.reply('Le volume est trop bas ou trop élevé ! (valeur entre 1 et 10)');
            }
        }
    },
};