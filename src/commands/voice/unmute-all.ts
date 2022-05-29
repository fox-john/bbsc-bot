import { GuildMember, Message, VoiceBasedChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'unmute-all',
    commands: ['unmute-all', 'unmute', 'unmute-users', 'unmute-channel', 'umc'],
    description: {
        title: 'Unmuter tous les utilisateurs du salon vocal en cours',
        args: []
    },
    minLevel: UserLevel.MODERATOR,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceBasedChannel = messageSended.member.voice.channel;
        const membersList = await currentChannel.members;

        bot.commands.get('play-internal-sound').execute(bot, 'unmute.ogg');

        membersList.forEach(async (member: GuildMember) => {
            if (member.id !== process.env.BBSC_BOT_ID) {
                await member.voice.setMute(false);
            }
        });
    }
};
