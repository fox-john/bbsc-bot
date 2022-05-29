import { ClientUser, ColorResolvable, EmbedFieldData, MessageEmbed, User } from "discord.js";

class EmbedMessage {
    constructor(params: { title: string, color: string, message?: string, user: User | ClientUser, fields?: Array<EmbedFieldData> | null }) {
        const embedMessage: MessageEmbed = new MessageEmbed();
        // const date: Date = new Date();
        // const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        if (params.user !== null) {
            // const avatar: string = params.user.avatar !== null ? params.user.avatarURL() : params.user.defaultAvatarURL;
            // embedMessage.setAuthor(params.user.username, avatar);
        }

        embedMessage.setColor(params.color as ColorResolvable);
        embedMessage.setTitle(params.title);
        params.message === undefined ? '' : embedMessage.setDescription(params.message);
        params.fields === null ? '' : embedMessage.addFields(params.fields);
        // embedMessage.setFooter(`Envoyé le ${dateFormatted}`)

        return embedMessage;
    }
}

export { EmbedMessage };
