import { Message, User } from 'discord.js';
import { Bot } from '../../classes/Bot';
import { EmbedMessage } from '../../classes/EmbedMessage';
import UserLevel from '../../enums/UserLevel';

const path = require('path');
const glob = require('glob');

module.exports = {
    name: 'man',
    commands: ['man'],
    description: {
        title: 'Recevoir plus d\'informations sur une commande',
        args: [
            {
                name: 'name',
                required: true
            }
        ]
    },
    minLevel: UserLevel.USER,
    isVoiceCommand: false,
    args: false,

    execute(bot: Bot, messageSended: Message, params: Array<string>) {
        if (params[0]) {
            const user: User = messageSended.author;
            const commandsDir = path.resolve(__dirname, '../');
            let commandInformations = '';

            glob(`${commandsDir}/**/*.ts`, function(err, commandFiles) {
                commandFiles.forEach((file) => {
                    const script = require(file);

                    if (script.commands.includes(params[0])) {
                        commandInformations =
                        `**DESCRIPTION**\n` +
                            `${script.name} - ${script.description.title}\n\n` +
                        `- **ALIAS**\n` +
                            `${script.commands.map(alias => ` /${alias}`)}\n\n` +
                        `**EXEMPLE**\n` +
                            `/${script.commands[0]} ${script.description.args.map(argument => argument.name)}\n`;
                    }
                });

                const embedMessage: EmbedMessage = new EmbedMessage({
                    color: '#006eff',
                    title: 'Liste des commandes',
                    message: commandInformations,
                    user
                });

                messageSended.reply(embedMessage);
            });
        } else {
            messageSended.reply('Vous devez entrer un paramètre pour la commande /man');
        }
    }
};