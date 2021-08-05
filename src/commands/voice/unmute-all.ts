import { GuildMember, Message, VoiceChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'unmute-channel',
    commands: ['unmute', 'unmute-users', 'unmute-channel', 'umc'],
    description: {
        title: 'Unmuter tous les utilisateurs du salon vocal en cours',
        args: []
    },
    minLevel: UserLevel.MODERATOR,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceChannel = messageSended.member.voice.channel;
        const membersList = await currentChannel.members;

        bot.commands.get('play-internal-sound').execute(bot, 'unmute.ogg');

        membersList.forEach(async (member: GuildMember) => {
            if (member.id !== process.env.BBSC_BOT_ID) {
                await member.voice.setMute(false);
            }
        });
    }
};
