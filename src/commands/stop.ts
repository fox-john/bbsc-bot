import { Bot } from '../Bot';

module.exports = {
    name: 'stop',
    alias: [],
    description: '**/stop**: Demander au bot de quitter le channel vocal',
    isAdmin: false,
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