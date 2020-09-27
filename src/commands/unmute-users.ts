import { Bot } from '../Bot';
import { GuildEmoji, GuildMember, Message, VoiceChannel } from 'discord.js';

module.exports = {
    name: 'unmute-users',
    alias: ['unmute'],
    description: '**/unmute**: Unmuter tous les utilisateurs du salon vocal en cours (/!\\ Ne retire pas le group "Mort Among Us" /!\\)',
    isAdmin: true,
    isVoiceCommand: true,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceChannel = messageSended.member.voice.channel;

        currentChannel.members.forEach((member: GuildMember) => {
            member.voice.setMute(false);
        });
    }
};
