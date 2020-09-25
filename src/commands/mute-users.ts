import { Bot } from '../Bot';
import { GuildMember, Message, VoiceChannel } from 'discord.js';

module.exports = {
    name: 'mute-users',
    alias: ['mute'],
    description: '**/mute**: Muter tous les utilisateurs du salon vocal en cours',
    isAdmin: true,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceChannel = messageSended.member.voice.channel;

        currentChannel.members.forEach((member: GuildMember) => {
            member.voice.setMute(true);
        })
    }
};