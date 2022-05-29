import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, Interaction, VoiceBasedChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';


const infos = new SlashCommandBuilder()
    .setName('mute-all')
    .setDescription('mute all users');

module.exports = {
    infos,
    async execute(bot: Bot, interaction: Interaction, member: GuildMember) {
        const currentChannel: VoiceBasedChannel = member.voice.channel;
        const membersList = await currentChannel.members;

        bot.commands.get('play-internal-sound').execute(bot, 'mute.ogg');

        membersList.forEach(async (member: GuildMember) => {
            if (member.id !== process.env.BBSC_BOT_ID) {
                await member.voice.setMute(true);
            }
        });
    }
};
