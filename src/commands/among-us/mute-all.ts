import { Bot } from '../../classes/Bot';
import { GuildMember, Message, VoiceChannel } from 'discord.js';

const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'mute-channel',
    alias: ['mute-channel', 'mc'],
    description: '**/mute-channel** or **/mc**: Muter tous les utilisateurs du salon vocal en cours',
    isInternal: false,
    isAdmin: true,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceChannel = messageSended.member.voice.channel;
        const membersList = await currentChannel.members;

        bot.commands.get('play-sound').execute(bot, 'mute.ogg');

        membersList.forEach(async (member: GuildMember) => {
            if (member.id !== process.env.BBSC_BOT_ID) {
                await member.voice.setMute(true);
            }
        });
    }
};