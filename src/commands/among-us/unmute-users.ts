import { Bot } from '../../classes/Bot';
import { GuildEmoji, GuildMember, Message, VoiceChannel } from 'discord.js';

const path = require('path');

module.exports = {
    name: 'unmute-users',
    alias: ['unmute'],
    description: '**/unmute**: Unmuter tous les utilisateurs du salon vocal en cours \n👆 ⚠️ Cette commande ne retire pas le groupe "Mort Among Us" aux joueurs ⚠️',
    isAdmin: true,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceChannel = messageSended.member.voice.channel;
        
        if (bot.currentVoiceConnection) {
            if (bot.voiceConnectionDispatcher !== null) {
                await bot.voiceConnectionDispatcher.end();
            }

            bot.voiceConnectionDispatcher = bot.currentVoiceConnection.play(path.resolve(__dirname, '../../../static/audio', 'unmute.mp3'));
        }

        const membersList = await currentChannel.members;

        membersList.forEach(async (member: GuildMember) => {
            if (member.id !== process.env.BBSC_BOT_ID) {
                await member.voice.setMute(false);
            }
        });
    }
};