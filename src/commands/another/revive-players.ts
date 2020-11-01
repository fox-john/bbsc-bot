import { Bot } from '../../classes/Bot';
import { GuildMember, Message, Role } from 'discord.js';

module.exports = {
    name: 'revive-players',
    alias: ['revive'],
    description: '**/revive**: Enlever tout les joueurs du groupe "Mort Among Us"',
    isAdmin: true,
    isVoiceCommand: false,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        const amongUsRole: Role = messageSended.guild.roles.cache.find(role => role.name === 'Mort Among Us');

        amongUsRole.members.forEach(async (member: GuildMember) => {
            await member.roles.remove(process.env.AMONG_US_ROLE_ID);
        });
    }
};