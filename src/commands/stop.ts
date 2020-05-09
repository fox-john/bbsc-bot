import { Bot } from '../Bot';

module.exports = {
    name: 'stop',
    description: 'stop playing sound',
    args: true,

    execute() {
        if (Bot.voiceConnectionDispatcher !== null) {
            Bot.voiceConnectionDispatcher.end();
        }

        if (Bot.currentVoiceConnection !== null) {
            Bot.currentVoiceConnection.channel.leave();
            Bot.currentVoiceConnection = null;
        }
    },
};