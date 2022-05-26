import { Message } from 'discord.js';
import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';
import { UserService } from '../../services/User.service';

module.exports = {
    name: 'regenerate-user-list',
    commands: ['regenerate-user-list', 'regenerate-userlist', 'regenerate-users'],
    description: {
        title: 'Regenerer la liste d\'utilisateurs présents dans la base de données',
        args: []
    },
    minLevel: UserLevel.ADMIN,
    isVoiceCommand: false,
    args: false,

    async execute(bot: Bot, messageSended: Message) {
        const members = await bot.bbscDiscord.members.fetch();

        UserService.regeneratedUserListIntoDb(members);

        messageSended.reply(`La base de données d'utilisateur as bien été regénéré.`);
    }
};
