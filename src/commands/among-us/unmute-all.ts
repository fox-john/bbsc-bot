import { Bot } from '../../classes/Bot';
import { GuildEmoji, GuildMember, Message, VoiceChannel } from 'discord.js';

const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'unmute-channel',
    alias: ['unmute-channel', 'umc'],
    description: '**/unmute-channel** or **/umc**: Unmuter tous les utilisateurs du salon vocal en cours \n👆 ⚠️ Cette commande ne retire pas le groupe "Mort Among Us" aux joueurs ⚠️',
    isInternal: false,
    isAdmin: true,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceChannel = messageSended.member.voice.channel;
        const membersList = await currentChannel.members;

        bot.commands.get('play-sound').execute(bot, 'unmute.ogg');

        membersList.forEach(async (member: GuildMember) => {
            if (member.id !== process.env.BBSC_BOT_ID) {
                await member.voice.setMute(false);
            }
        });
    }
};
