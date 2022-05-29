import { VoiceConnection } from '@discordjs/voice';
import { Message, VoiceChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';
import { connectToChannel } from '../../utils/connect-to-channel';

module.exports = {
    name: 'join',
    commands: ['join', 'connect'],
    description: {
        title: 'Demander au bot de se connecter au salon vocal',
        args: []
    },
    minLevel: UserLevel.MODERATOR,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, messageSended: Message): Promise<VoiceConnection> {
        const channel = messageSended.member.voice.channel;
        let connection;

        if (channel.isVoice() && channel.joinable) {
            connection = await connectToChannel(channel as VoiceChannel);
        }

        return connection;
    }
};
