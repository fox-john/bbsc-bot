import { VoiceState, User, VoiceChannel, Client, Message, GuildMember, TextChannel } from "discord.js";
import { Server } from './Server';
import { EmbedType } from "./EmbedMessage";

export class EventManager {

    constructor(server: Client) {
        server.on('ready', () => console.log('server is ready !'));
        server.on('voiceStateUpdate', (oldState: VoiceState, newState: VoiceState) => this.onUserVoiceChange(oldState, newState));
        server.on('guildMemberAdd', (member: GuildMember) => this.OnUserJoin(member));
        server.on('message', (message: Message) => this.onMessage(message));
    }

    async onUserVoiceChange(oldState: VoiceState, newState: VoiceState) {
        if (await Server.isMine(oldState.id)) return;

        const user: User = await Server.getUserById(oldState.id);

        if (oldState.channelID === null && newState.channelID !== null) {
            const newChannel: VoiceChannel = await Server.getVoiceChannelById(newState.channelID);

            Server.writeLog(EmbedType.START_VOICE_CONNECTION, user, `${user.username} vient de se connecter au channel **${newChannel.name}**.`);
        } else if (oldState.channelID !== null && newState.channelID === null) {
            const oldChannel: VoiceChannel = await Server.getVoiceChannelById(oldState.channelID);

            Server.writeLog(EmbedType.END_VOICE_CONNECTION, user, `${user.username} vient de se déconnecter du channel **${oldChannel.name}**.`);
        }
    }

    async onMessage(message: Message) {
        if (Server.isMine(message.author.id)) return;
        
        if (message.content.startsWith('/')) {
            const params = message.content.slice(1).split(/ +/);
	        const command = params.shift().toLowerCase();
            this.onCommand(command, params, message);
        } else {
            Server.writeLog(EmbedType.NEW_MESSAGE, message.author, message.content);
        }
    }

    async onCommand(command: string, params: Array<string>, message: Message) {
        if (command === 'ping') {
            const fakeIp = `${Math.ceil(Math.random() * 255)}.${Math.ceil(Math.random() * 100)}.${Math.ceil(Math.random() * 100)}.${Math.ceil(Math.random() * 100)}`;

            message.reply(`Envoi d’une requête 'ping' sur ${message.author.username} [${fakeIp}] avec 32 octets de données :`);
            setTimeout(() => {
                
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        message.reply(`Réponse de ${fakeIp} : octets=32 temps=${Math.ceil(Math.random() * 100)} ms TTL=51`);
                    }, i * 1000);
                }
            }, 1000);
        }
        if (command === 'clean') {
            const quantity: number = params[0] ? parseInt(params[0]) : 1;
            Server.bulkRemoveMessages(message.channel as TextChannel, quantity);
        }
    }

    async OnUserJoin(member: GuildMember) {
        member.user.bot ? member.roles.add(process.env.BOT_ROLE_ID) : member.roles.add(process.env.NEW_USER_ROLE_ID);
    }
}