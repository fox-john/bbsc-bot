import { Bot } from '../Bot';
import { Message, User, GuildEmoji, DMChannel } from 'discord.js';
import { EmbedType, EmbedMessage } from '../EmbedMessage';

module.exports = {
    name: 'help',
    description: 'Get command list',
    args: false,

    execute(messageSended: Message) {
        const user: User = messageSended.author;
        let helpMessage: string = '';

        if (messageSended.member.hasPermission('ADMINISTRATOR')) {
            helpMessage += '**Admin:** \n';
            helpMessage += '**/clean [quantité]**: Suppprimer les X derniers messages \n\n';
        }

        helpMessage += '**Utilisateur:** \n';
        helpMessage += '**/help**: Recevoir la liste des commandes \n';
        helpMessage += '**/ping**: Recevoir un ping du bot \n';
        helpMessage += '**/play [youtube url]**: Demander au bot de lire une vidéo youtube \n';
        helpMessage += '**/stop**: Demander au bot de quitter le channel vocal \n';
        helpMessage += '**/setvolume [volume: 1 > 10]**: Définir le volume du bot';
        
        const embedMessage: EmbedMessage = new EmbedMessage(EmbedType.HELP_COMMANDS, user, helpMessage);
        const emojiSmirks: GuildEmoji = Bot.client.emojis.cache.find(emoji => emoji.name === 'smirks');
        user.createDM().then((dm) => {
            dm.send(embedMessage);
            messageSended.reply(`Liste des commandes envoyé par MP ${emojiSmirks}`);
        });
    }
};