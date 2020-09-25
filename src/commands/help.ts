import { Message, User, GuildEmoji } from 'discord.js';
import { EmbedType, EmbedMessage } from '../EmbedMessage';
import { Bot } from '../Bot';
const path = require('path');
const glob = require('glob');


module.exports = {
    name: 'help',
    alias: [],
    description: '**/help**: Recevoir la liste des commandes',
    isAdmin: false,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        const user: User = messageSended.author;
        let helpMessage: string = '';
        let commandsList: Array<Array<string>> = [[], []];

        // get all commands
        const commandsDir = path.resolve(__dirname, './');

        glob(`${commandsDir}/**/*.ts`, function(err, commandFiles) {
            commandFiles.forEach((file) => {
                const command = require(file);
                const helpText = `${command.description}\n`

                if (command.isAdmin) commandsList[0].push(helpText);
                else commandsList[1].push(helpText);
            });

            if (messageSended.member.hasPermission('ADMINISTRATOR')) {
                helpMessage += '**Administrateur:** \n';

                commandsList[0].forEach(commandText => {
                    helpMessage += commandText;
                })
                helpMessage += '\n';
            }
    
            helpMessage += '**Utilisateur:** \n';
    
            commandsList[1].forEach(commandText => {
                helpMessage += commandText;
            })
            
            const embedMessage: EmbedMessage = new EmbedMessage(EmbedType.HELP_COMMANDS, helpMessage, user);
            const emojiSmirks: GuildEmoji = bot.emojis.cache.find(emoji => emoji.name === 'smirks');
    
            user.createDM().then((dm) => {
                dm.send(embedMessage);
                messageSended.reply(`Liste des commandes envoyé par MP ${emojiSmirks}`);
            });
        });
    }
};
