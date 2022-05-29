import { GuildMember, Message, VoiceBasedChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'mute-all',
    commands: ['mute-all', 'mute', 'mute-users', 'mute-channel', 'mc'],
    description: {
        title: 'Muter tous les utilisateurs du salon vocal en cours',
        args: []
    },
    minLevel: UserLevel.MODERATOR,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, messageSended: Message) {
        const currentChannel: VoiceBasedChannel = messageSended.member.voice.channel;
        const membersList = await currentChannel.members;

        bot.commands.get('play-internal-sound').execute(bot, 'mute.ogg');

        membersList.forEach(async (member: GuildMember) => {
            if (member.id !== process.env.BBSC_BOT_ID) {
                await member.voice.setMute(true);
            }
        });
    }
};
