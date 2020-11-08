import { GuildMember } from "discord.js";
import { Bot } from "../../classes/Bot";

module.exports = {
    name: 'guildMemberAdd',

    execute: (bot: Bot, member: GuildMember) => {
        member.user.bot ? member.roles.add(process.env.BOT_ROLE_ID) : member.roles.add(process.env.NEW_USER_ROLE_ID);
    }
};