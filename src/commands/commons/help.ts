import { GuildEmoji, Message, User } from 'discord.js';
import { Bot } from '../../classes/Bot';
import { EmbedMessage } from '../../classes/EmbedMessage';
import UserLevel from '../../enums/UserLevel';
const path = require('path');
const glob = require('glob');


module.exports = {
    name: 'help',
    alias: [],
    description: '**/help**: Recevoir la liste des commandes',
    minLevel: UserLevel.USER,
    isVoiceCommand: false,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        const user: User = messageSended.author;
        let helpMessage = '';
        const commandsList: Array<Array<string>> = [[], [], []];

        // get all commands
        const commandsDir = path.resolve(__dirname, '../');

        glob(`${commandsDir}/**/*.ts`, function(err, commandFiles) {
            commandFiles.forEach((file) => {
                const command = require(file);
                const helpText = `${command.description}\n`

                if (command.minLevel === UserLevel.ADMIN) commandsList[UserLevel.ADMIN].push(helpText);
                else if (command.minLevel === UserLevel.MODERATOR) commandsList[UserLevel.MODERATOR].push(helpText);
                else commandsList[UserLevel.USER].push(helpText);
            });

            if (messageSended.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                helpMessage += '**Administrateur:** \n';

                commandsList[UserLevel.ADMIN].forEach(commandText => {
                    helpMessage += commandText;
                });

                commandsList[UserLevel.MODERATOR].forEach(commandText => {
                    helpMessage += commandText;
                });

                helpMessage += '\n';
            }

            if (messageSended.member.roles.cache.has(process.env.MODERATOR_ROLE_ID)) {
                helpMessage += '**Moderateur:** \n';

                commandsList[UserLevel.MODERATOR].forEach(commandText => {
                    helpMessage += commandText;
                });

                helpMessage += '\n';
            }

            helpMessage += '**Utilisateur:** \n';

            commandsList[UserLevel.USER].forEach(commandText => {
                helpMessage += commandText;
            })

            const embedMessage: EmbedMessage = new EmbedMessage({
                color: '#006eff',
                title: 'Liste des commandes',
                message: helpMessage,
                user
            });

            const emojiSmirks: GuildEmoji = bot.emojis.cache.find(emoji => emoji.name === 'smirks');

            user.createDM().then((dm) => {
                dm.send(embedMessage);
                messageSended.reply(`Liste des commandes envoyé par MP ${emojiSmirks}`);
            });
        });
    }
};
