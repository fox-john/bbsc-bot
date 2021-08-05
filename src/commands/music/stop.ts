import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'stop',
    commands: ['stop', 'leave'],
    description: {
        title: 'Demander au bot de quitter le channel vocal',
        args: []
    },
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
