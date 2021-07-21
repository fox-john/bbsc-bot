import { Bot } from '../../classes/Bot';
import UserLevel from '../../enums/UserLevel';

const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'play-internal-sound',
    commands: ['play-internal-sound'],
    description: {
        title: '[INTERNAL] Jouer un son local',
        args: [
            {
                name: 'soundName',
                required: true
            }
        ]
    },
    minLevel: UserLevel.INTERNAL,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, fileName: string) {
        if (fileName) {
            if (bot.currentVoiceConnection) {
                if (bot.voiceConnectionDispatcher !== null) {
                    await bot.voiceConnectionDispatcher.end();
                }

                bot.voiceConnectionDispatcher = bot.currentVoiceConnection.play(fs.createReadStream(path.resolve(__dirname, '../../../static/audio', fileName)), { type: 'ogg/opus' });
            }
        }
    }
};