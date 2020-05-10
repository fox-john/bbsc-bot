import { VoiceState, TextChannel, User } from "discord.js";
import { Bot } from '../Bot';
import { EmbedType } from "../EmbedMessage";

module.exports = {
    name: 'voiceStateUpdate',

    execute: (bot: Bot, oldState: VoiceState, newState: VoiceState) => {
        if (oldState.member.user.bot) return;

        bot.users.fetch(oldState.member.user.id).then((user: User) => {
            if (oldState.channelID === null && newState.channelID !== null) {
                bot.channels.fetch(newState.channelID).then((channel: TextChannel) => {
                    bot.writeLog(EmbedType.START_VOICE_CONNECTION, user, `${user.username} vient de se connecter au channel **${channel.name}**.`);
                });
            } else if (oldState.channelID !== null && newState.channelID === null) {
                bot.channels.fetch(oldState.channelID).then((channel: TextChannel) => {
                    bot.writeLog(EmbedType.END_VOICE_CONNECTION, user, `${user.username} vient de se déconnecter du channel **${channel.name}**.`);
                });
            }
        });
    }
};