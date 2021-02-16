import { Bot } from '../../classes/Bot';
import { GuildMember, Message, VoiceChannel } from 'discord.js';

const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'play-sound',
    alias: ['play-sound', 'ps'],
    description: '**/play-sound [sound-name]** or **/ps [sound-name]**: Jouer un son local',
    isInternal: true,
    isAdmin: true,
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