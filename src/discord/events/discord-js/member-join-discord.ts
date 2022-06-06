import { GuildMember } from "discord.js";
import { Bot } from "../../classes/discord/Bot";
import { UserService } from "@mariadb/services/User.service";

module.exports = {
    name: 'guildMemberAdd',

    execute: (bot: Bot, member: GuildMember) => {
        if (member.user.bot) {
            member.roles.add(process.env.BOT_ROLE_ID);
        } else {
            UserService.addNewUserIntoDb(member);
        }
    }
};
