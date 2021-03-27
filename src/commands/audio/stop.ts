import { Bot } from '../../classes/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'stop',
    alias: ['leave'],
    description: '**/stop**: Demander au bot de quitter le channel vocal',
    minLevel: UserLevel.USER,
    isVoiceCommand: true,
    args: true,

    execute(bot: Bot) {
        if (bot.voiceConnectionDispatcher !== null) {
            bot.voiceConnectionDispatcher.destroy();
        }

        if (bot.currentVoiceConnection !== null) {
            bot.currentVoiceConnection.channel.leave();
            bot.currentVoiceConnection = null;
        }
    },
};