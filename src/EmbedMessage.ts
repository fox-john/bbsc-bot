import { MessageEmbed, User } from "discord.js";

class EmbedMessage {
    constructor(type: EmbedType, user: User, message?: String) {
        const embed = new MessageEmbed();
        const date = new Date();
        const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        const avatar = user.avatar !== null ? user.avatarURL() : user.defaultAvatarURL;
        const color = type === EmbedType.END_VOICE_CONNECTION ? '#C10000' : '#00D315';
        embed.setColor(color);
        embed.setAuthor(user.username, avatar);
        embed.setTitle(type);
        embed.setDescription(message);
        embed.setFooter(`Envoyé le ${dateFormatted}`)

        return embed;
    }
}

enum EmbedType {
    NEW_MESSAGE = 'Un nouveau message à été envoyé',
    START_VOICE_CONNECTION = 'Connexion channel vocal',
    END_VOICE_CONNECTION = 'Déconnexion channel vocal'
}

export { EmbedMessage, EmbedType };