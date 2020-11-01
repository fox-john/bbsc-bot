import { Bot } from '../../classes/Bot';

module.exports = {
    name: 'stop',
    alias: [],
    description: '**/stop**: Demander au bot de quitter le channel vocal',
    isAdmin: false,
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