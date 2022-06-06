import { GuildEmoji, Interaction } from "discord.js";
import { Bot } from "../../classes/discord/Bot";

module.exports = {
  name: 'interactionCreate',

  async execute(bot: Bot, interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const member = await interaction.guild.members.cache.find((member) => member.id === interaction.user.id);
    const command = await bot.commands.get(interaction.commandName);

    if (!command) return interaction.reply('Désolé, cette commande n\'existe pas.');

    try {
      command.execute(bot, interaction, member);
    } catch (error) {
      const emojiBwa: GuildEmoji = bot.emojis.cache.find(emoji => emoji.name === 'bwa');
      interaction.reply(`Désolé, Il y a eu une erreur en executant cette commande ${emojiBwa}`);
      throw error;
    }
  }
};
