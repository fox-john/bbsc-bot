import { SlashCommandBuilder } from '@discordjs/builders';
import { getVoiceConnection } from '@discordjs/voice';
import { Interaction } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';

const infos = new SlashCommandBuilder()
    .setName('leave')
    .setDescription('leave your current voice channel');

module.exports = {
    infos,

    async execute(bot: Bot, interaction: Interaction) {
        if (interaction.isRepliable()) {
            interaction.reply('Ok, ok, ca va, je me casse, rhooo...');
        }

        const connection = await getVoiceConnection(bot.bbscDiscord.id);

        if (connection) {
            await connection.destroy();
        }
    },
};
