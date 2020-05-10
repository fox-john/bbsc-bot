import { GuildMember, Client } from "discord.js";

module.exports = {
    name: 'guildMemberAdd',

    execute: (client: Client, member: GuildMember) => {
        member.user.bot ? member.roles.add(process.env.BOT_ROLE_ID) : member.roles.add(process.env.NEW_USER_ROLE_ID);
    }
};