import { MessageEmbed, User } from "discord.js";
import { isNull } from "util";

class EmbedMessage {
    constructor(type: string | EmbedType, message: String, user: User = null) {
        const embedMessage: MessageEmbed = new MessageEmbed();
        const date: Date = new Date();
        const dateFormatted: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`        
        const color: string = type === EmbedType.END_VOICE_CONNECTION ? '#C10000' : '#00D315';
        
        if (!isNull(user)) {
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
    START_VOICE_CONNECTION = 'Connexion channel vocal',
    END_VOICE_CONNECTION = 'Déconnexion channel vocal',
    HELP_COMMANDS = 'Liste des commandes'
}

export { EmbedMessage, EmbedType };