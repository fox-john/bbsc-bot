import { Bot } from '../../classes/Bot';
import { GuildMember, Message, VoiceChannel } from 'discord.js';

const path = require('path');

module.exports = {
    name: 'mute-users',
    alias: ['mute'],
    description: '**/mute**: Muter tous les utilisateurs du salon vocal en cours',
    isAdmin: true,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceChannel = messageSended.member.voice.channel;

        if (bot.currentVoiceConnection) {
            if (bot.voiceConnectionDispatcher !== null) {
                await bot.voiceConnectionDispatcher.end();
            }
            console.log('mute');
            bot.voiceConnectionDispatcher = bot.currentVoiceConnection.play(path.resolve(__dirname, '../../static/audio', 'mute.mp3'));
        }

        const membersList = await currentChannel.members;
        
        membersList.forEach(async (member: GuildMember) => {
            if (member.id !== process.env.BBSC_BOT_ID) {
                await member.voice.setMute(true);
            }
        });
    }
};