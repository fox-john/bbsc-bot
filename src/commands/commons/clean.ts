import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, Interaction, Message, TextChannel } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';

const infos = new SlashCommandBuilder()
    .setName('clean')
    .setDescription('Clean X messages')
    .addIntegerOption((option) => {
        return option
            .setName('quantity')
            .setDescription('Quantity you want to delete')
            .setRequired(true)
    });

module.exports = {
    infos,
    execute(bot: Bot, interaction: Interaction, member: GuildMember) {
        if (!interaction.isCommand()) return;

        const quantity: number = interaction.options.getInteger('quantity');

        if (!interaction.isRepliable()) return;

        if (quantity > 100) {
            return interaction.reply('Vous ne pouvez pas supprimer plus de 100 messages à la fois !').then((message) => {
                setTimeout(() => {
                    //message.delete();
                }, 3000);
            })
        }

        const channel: TextChannel = interaction.channel as TextChannel;
        const messagesToDelete: Array<Message> = [];
        let quantityDeleted = 0;

        channel.messages.fetch({ limit: quantity + 1 }).then((messages) => {
            messages.forEach((message) => {
                if (!message.pinned) {
                    messagesToDelete.push(message);
                    quantityDeleted++;
                }
            });

            channel.bulkDelete(messagesToDelete).catch(() => {
                messagesToDelete.forEach((message) => {
                    if (!message.deleted) {
                        message.delete();
                    }
                })
            }).finally(() => {
                return interaction.reply(`${quantityDeleted} message(s) viennent d'être supprimé !`);
            })
        });
    }
};
