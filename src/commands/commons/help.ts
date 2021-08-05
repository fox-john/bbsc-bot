import { GuildEmoji, Message, User } from 'discord.js';
import glob from 'glob';
import * as path from 'path';
import { Bot } from '../../classes/discord/Bot';
import { EmbedMessage } from '../../classes/discord/EmbedMessage';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'help',
    commands: ['help', 'commands'],
    description: {
        title: 'Recevoir la liste des commandes',
        args: []
    },
    minLevel: UserLevel.USER,
    isVoiceCommand: false,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        const user: User = messageSended.author;
        let helpMessage = '';
        const commandsList: Array<Array<string>> = [[], [], []];

        // get all commands
        const commandsDir = path.resolve(__dirname, '../');

        glob(`${commandsDir}/**/*.ts`, function(_error: Error, commandFiles: Array<string>) {
            commandFiles.forEach((file) => {
                const command = require(file);

                const helpText = `/${command.name}, `;

                if (command.minLevel !== UserLevel.INTERNAL) {
                    if (command.minLevel === UserLevel.ADMIN) commandsList[UserLevel.ADMIN].push(helpText);
                    else if (command.minLevel === UserLevel.MODERATOR) commandsList[UserLevel.MODERATOR].push(helpText);
                    else commandsList[UserLevel.USER].push(helpText);
                }
            });

            if (messageSended.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                if (commandsList[UserLevel.ADMIN].length) {
                    helpMessage += '**Administrateur:** \n';

                    commandsList[UserLevel.ADMIN].forEach(commandText => {
                        helpMessage += commandText;
                    });
                }

                //helpMessage = helpMessage.slice(0, -2);
                helpMessage += '\n\n';
            }

            if (messageSended.member.roles.cache.has(process.env.ADMIN_ROLE_ID) || messageSended.member.roles.cache.has(process.env.MODERATOR_ROLE_ID)) {
                helpMessage += '**Moderateur:** \n';

                if (commandsList[UserLevel.MODERATOR].length) {
                    commandsList[UserLevel.MODERATOR].forEach(commandText => {
                        helpMessage += commandText;
                    });
                } else {
                    helpMessage += 'Aucune commandes existante pour ce rôle';
                }

                helpMessage = helpMessage.slice(0, -2);
                helpMessage += '\n\n';
            }

            helpMessage += '**Utilisateur:** \n';

            if (commandsList[UserLevel.USER].length) {
                commandsList[UserLevel.USER].forEach(commandText => {
                    helpMessage += commandText;
                });
            } else {
                helpMessage += 'Aucune commandes existante pour ce rôle';
            }
            console.log(helpMessage);
            helpMessage = helpMessage.slice(0, -2);

            const embedMessage: EmbedMessage = new EmbedMessage({
                color: '#006eff',
                title: 'Liste des commandes',
                message: helpMessage,
                user
            });

            const emojiVent: GuildEmoji = bot.emojis.cache.find(emoji => emoji.name === 'vent');

            user.createDM().then((dm) => {
                dm.send(embedMessage);
                messageSended.reply(`Liste des commandes envoyé par MP ${emojiVent}`);
            });
        });
    }
};
