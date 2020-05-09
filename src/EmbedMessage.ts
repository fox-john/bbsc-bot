import { MessageEmbed, User } from "discord.js";

class EmbedMessage {
    constructor(type: EmbedType, user: User, message?: String) {
        const embedMessage: MessageEmbed = new MessageEmbed();
        const date: Date = new Date();
        const dateFormatted: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        const avatar: string = user.avatar !== null ? user.avatarURL() : user.defaultAvatarURL;
        const color: string = type === EmbedType.END_VOICE_CONNECTION ? '#C10000' : '#00D315';


        embedMessage.setColor(color);
        embedMessage.setAuthor(user.username, avatar);
        embedMessage.setTitle(type);
        embedMessage.setDescription(message);
        embedMessage.setFooter(`Envoyé le ${dateFormatted}`)

        return embedMessage;
    }
}

enum EmbedType {
    NEW_MESSAGE = 'Un nouveau message à été envoyé',
    START_VOICE_CONNECTION = 'Connexion channel vocal',
    END_VOICE_CONNECTION = 'Déconnexion channel vocal',
    HELP_COMMANDS = 'Liste des commandes'
}

export { EmbedMessage, EmbedType };