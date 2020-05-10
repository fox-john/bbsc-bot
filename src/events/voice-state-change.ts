import { VoiceState, Client } from "discord.js";
import { Bot } from '../Bot';
import { EmbedType } from "../EmbedMessage";

module.exports = {
    name: 'voiceStateUpdate',

    execute: (client: Client, oldState: VoiceState, newState: VoiceState) => {
        if (oldState.member.user.bot) return;

        Bot.getUserById(oldState.member.user.id).then((user) => {
            if (oldState.channelID === null && newState.channelID !== null) {
                Bot.getVoiceChannelById(newState.channelID).then((channel) => {
                    Bot.writeLog(EmbedType.START_VOICE_CONNECTION, user, `${user.username} vient de se connecter au channel **${channel.name}**.`);
                });
            } else if (oldState.channelID !== null && newState.channelID === null) {
                Bot.getVoiceChannelById(oldState.channelID).then((channel) => {
                    Bot.writeLog(EmbedType.END_VOICE_CONNECTION, user, `${user.username} vient de se déconnecter du channel **${channel.name}**.`);
                });
            }
        });
    }
};