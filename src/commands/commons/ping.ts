import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, Interaction, Message } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';

const infos = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('get pong !');

module.exports = {
    infos,
    execute(bot: Bot, interaction: Interaction, member: GuildMember) {
        const fakeIp = `${Math.ceil(Math.random() * 255)}.${Math.ceil(Math.random() * 100)}.${Math.ceil(Math.random() * 100)}.${Math.ceil(Math.random() * 100)}`;

        if (interaction.isRepliable()) {
            interaction.reply(`Envoi d’une requête 'ping' sur ${member.user.username} [${fakeIp}] avec 32 octets de données :`);
            setTimeout(() => {

                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        interaction.reply(`Réponse de ${fakeIp} : octets=32 temps=${Math.ceil(Math.random() * 100)} ms TTL=51`);
                    }, i * 1000);
                }
            }, 1000);
        }
    }
};
