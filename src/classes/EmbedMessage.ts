import { MessageEmbed, User } from "discord.js";

class EmbedMessage {
    constructor(type: string | EmbedType, message: string, user: User = null) {
        const embedMessage: MessageEmbed = new MessageEmbed();
        const date: Date = new Date();
        const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`        
        const color: string = type === EmbedType.END_VOICE_CONNECTION || type === EmbedType.ERROR ? '#C10000' : '#00D315';

        if (user !== null) {
            const avatar: string = user.avatar !== null ? user.avatarURL() : user.defaultAvatarURL;
            embedMessage.setAuthor(user.username, avatar);
        }

        embedMessage.setColor(color);
        embedMessage.setTitle(type);
        embedMessage.setDescription(message);
        embedMessage.setFooter(`Envoyé le ${dateFormatted}`)

        return embedMessage;
    }
}

enum EmbedType {
    NEW_MESSAGE = 'Un nouveau message à été envoyé',
    START_VOICE_CONNECTION = 'Connexion à un canal vocal',
    MOVE_VOICE_CONNECTION = 'Changement de canal vocal',
    END_VOICE_CONNECTION = 'Déconnexion d\'un canal vocal',
    HELP_COMMANDS = 'Liste des commandes',
    ERROR = 'Une erreur est survenue',
    INFO = 'Info'
}

export { EmbedMessage, EmbedType };