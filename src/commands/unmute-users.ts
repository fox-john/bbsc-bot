import { Bot } from '../Bot';
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
            bot.currentVoiceConnection.play(path.resolve(__dirname, '../../static/audio', 'unmute.mp3'));
        }

        const membersList = await currentChannel.members;

        membersList.forEach((member: GuildMember) => {
            if (member.id !== '522189169829871631') {
                member.voice.setMute(false);
            }
        });
    }
};
