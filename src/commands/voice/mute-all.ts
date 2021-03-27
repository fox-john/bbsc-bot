import { GuildMember, Message, VoiceChannel } from 'discord.js';
import { Bot } from '../../classes/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'mute-channel',
    commands: ['mute', 'mute-users', 'mute-channel', 'mc'],
    exemple: '/mute',
    description: 'Muter tous les utilisateurs du salon vocal en cours',
    minLevel: UserLevel.MODERATOR,
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