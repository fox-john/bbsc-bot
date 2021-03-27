import { Bot } from '../../classes/Bot';
import UserLevel from '../../enums/UserLevel';

const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'play-sound',
    alias: ['play-sound', 'play'],
    description: '**/play-sound [sound-name]** or **/ps [sound-name]**: Jouer un son local',
    minLevel: UserLevel.ADMIN,
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