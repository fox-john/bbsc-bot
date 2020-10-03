import { Bot } from '../Bot';
import { GuildMember, Message, VoiceChannel } from 'discord.js';

const path = require('path');

module.exports = {
    name: 'unmute-users',
    alias: ['unmute'],
    description: '**/unmute**: Unmuter tous les utilisateurs du salon vocal en cours (/!\\ Ne retire pas le group "Mort Among Us" /!\\)',
    isAdmin: true,
    isVoiceCommand: true,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceChannel = messageSended.member.voice.channel;
        
        if (bot.currentVoiceConnection) {
            bot.currentVoiceConnection.play(path.resolve(__dirname, '../..', 'static', 'audio', 'unmute.mp3'));
        }

        currentChannel.members.forEach((member: GuildMember) => {
            if (member.id !== '522189169829871631') {
                member.voice.setMute(false);
            }
        });
    }
};
