import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, Interaction, VoiceBasedChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';
import { UserService } from '../../services/User.service';

const infos = new SlashCommandBuilder()
    .setName('regenerate-user-list')
    .setDescription('regenerated all user in mariadDB');

module.exports = {
    infos,
    async execute(bot: Bot, interaction: Interaction, member: GuildMember) {
        const members = await bot.bbscDiscord.members.fetch();

        UserService.regeneratedUserListIntoDb(members);

        if (interaction.isRepliable()) {
            interaction.reply(`La base de données d'utilisateur as bien été regénéré.`);
        }
    }
};
