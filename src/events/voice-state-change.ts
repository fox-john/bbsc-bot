import { VoiceState, TextChannel, User, VoiceChannel } from "discord.js";
import { Bot } from '../Bot';
import { EmbedType } from "../EmbedMessage";

module.exports = {
    name: 'voiceStateUpdate',

    execute: (bot: Bot, oldState: VoiceState, newState: VoiceState) => {
        if (oldState.member.user.bot) return;

        const amongUsChannel: VoiceChannel = bot.channels.cache.get(process.env.AMONG_US_CHANNEL_ID) as VoiceChannel;
        const user = newState.member.user;

        if (!oldState.channelID && newState.channelID) {
            bot.channels.fetch(newState.channelID).then((channel: TextChannel) => {
                bot.writeLog(EmbedType.START_VOICE_CONNECTION, user, `${user.username} vient de se connecter au channel **${channel.name}**.`);
            });
        } else if (oldState.channelID && !newState.channelID) {
            if (newState.member.roles.cache.has(process.env.AMONG_US_ROLE_ID)) {
                newState.member.roles.remove(process.env.AMONG_US_ROLE_ID);
            }

            bot.channels.fetch(oldState.channelID).then((channel: TextChannel) => {
                bot.writeLog(EmbedType.END_VOICE_CONNECTION, user, `${user.username} vient de se déconnecter du channel **${channel.name}**.`);
            });
        }
    }
};