import { MessageEmbed, User } from "discord.js";

class EmbedMessage {
    public embedType: EmbedType;
    public user: User;
    public message: String;

    constructor(type: EmbedType, user: User, message?: String) {
        this.embedType = type;
        this.user = user;
        this.message = message;

        this.init();
    }

    init() {
        const embed: MessageEmbed = new MessageEmbed();
        const date: Date = new Date();
        const dateFormatted: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        const avatar: string = this.user.avatar !== null ? this.user.avatarURL() : this.user.defaultAvatarURL;
        const color: string = this.embedType === EmbedType.END_VOICE_CONNECTION ? '#C10000' : '#00D315';


        embed.setColor(color);
        embed.setAuthor(this.user.username, avatar);
        embed.setTitle(this.embedType);
        embed.setDescription(this.message);
        embed.setFooter(`Envoyé le ${dateFormatted}`)

        return embed;
    }
}

enum EmbedType {
    NEW_MESSAGE = 'Un nouveau message à été envoyé',
    START_VOICE_CONNECTION = 'Connexion channel vocal',
    END_VOICE_CONNECTION = 'Déconnexion channel vocal',
    HELP_COMMANDS = 'Liste des commandes'
}

export { EmbedMessage, EmbedType };