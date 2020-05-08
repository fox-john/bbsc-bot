import { Bot } from '../Bot';
import { Message } from 'discord.js';
import { EmbedType, EmbedMessage } from '../EmbedMessage';

module.exports = {
	name: 'help',
	description: 'Get command list',
    args: false,

	async execute(client: Bot, messageSended: Message) {
		const user = messageSended.author;

		const helpMessage = '' + 
            '**Admin:**' + '\n' +
            '**/clean [quantité]**: Suppprimer les X derniers messages' + '\n' + '\n' +
            '**Utilisateur:**' + '\n' +
            '**/help**: Recevoir la liste des commandes' + '\n' +
            '**/ping**: Recevoir un ping du bot' + '\n' +
            '**/play [youtube url]**: Demander au bot de lire une vidéo youtube' + '\n' +
            '**/stop**: Demander au bot de quitter le channel vocal' + '\n' +
            '**/setvolume [volume: 1 > 10]**: Définir le volume du bot';
        
        const embedMessage = new EmbedMessage(EmbedType.HELP_COMMANDS, user, helpMessage);
        const emojiSmirks = client.emojis.cache.find(emoji => emoji.name === 'smirks');
        const dm = await user.createDM();

        dm.send(embedMessage);
        messageSended.reply(`Liste des commandes envoyé par MP ${emojiSmirks}`);
	}
};