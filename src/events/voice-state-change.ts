import { VoiceState } from "discord.js";
import { Bot } from '../Bot';
import { EmbedType } from "../EmbedMessage";

module.exports = {
    name: 'voiceStateUpdate',

    execute: (bot: Bot, oldState: VoiceState, newState: VoiceState) => {
        if (oldState.member.user.bot) return;

        bot.getUserById(oldState.member.user.id).then((user) => {
            if (oldState.channelID === null && newState.channelID !== null) {
                bot.getVoiceChannelById(newState.channelID).then((channel) => {
                    bot.writeLog(EmbedType.START_VOICE_CONNECTION, user, `${user.username} vient de se connecter au channel **${channel.name}**.`);
                });
            } else if (oldState.channelID !== null && newState.channelID === null) {
                bot.getVoiceChannelById(oldState.channelID).then((channel) => {
                    bot.writeLog(EmbedType.END_VOICE_CONNECTION, user, `${user.username} vient de se déconnecter du channel **${channel.name}**.`);
                });
            }
        });
    }
};