import { SlashCommandBuilder } from '@discordjs/builders';
import { VoiceConnection } from '@discordjs/voice';
import { GuildMember, Interaction, Message, VoiceChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';
import { connectToChannel } from '../../utils/connect-to-channel';

const infos = new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join your current voice channel');

module.exports = {
    infos,
    async execute(bot: Bot, interaction: Interaction, member: GuildMember): Promise<VoiceConnection> {
        const channel = member.voice.channel;

        let connection;

        if (channel && channel.isVoice() && channel.joinable) {
            connection = await connectToChannel(channel as VoiceChannel);

            if (interaction.isRepliable()) {
                interaction.reply('Go Go Go, je te rejoins !');
            }
        } else {
            if (interaction.isRepliable()) {
                interaction.reply('Tu dois être dans un canal vocal pour utiliser cette commande');
            }
        }

        return connection;
    }
};
