import { VoiceState, VoiceChannel } from "discord.js";
import { Bot } from '../Bot';
import { EmbedType } from "../EmbedMessage";

module.exports = {
    name: 'voiceStateUpdate',

    execute: (bot: Bot, oldState: VoiceState, newState: VoiceState) => {
        if (oldState.member.user.bot) return;
        const member = newState.member;
        const oldChannel = bot.channels.cache.get(oldState.channelID) as VoiceChannel;
        const newChannel = bot.channels.cache.get(newState.channelID) as VoiceChannel;

        // AMONG US
        if ((!oldState.channelID && newState.channelID) || (oldState.channelID && newState.channelID && oldState.channelID !== newState.channelID)) {
            if (member.roles.cache.has(process.env.AMONG_US_ROLE_ID)) member.roles.remove(process.env.AMONG_US_ROLE_ID);
        }

        if (!oldState.channelID && newState.channelID) {
            bot.writeLog(EmbedType.START_VOICE_CONNECTION, member.user, `${member.user.username} vient de se connecter au canal **${newChannel.name}**.`);
        } else if (oldState.channelID && !newState.channelID) {
            bot.writeLog(EmbedType.END_VOICE_CONNECTION, member.user, `${member.user.username} vient de se déconnecter du canal **${oldChannel.name}**.`);
        } else if (oldState.channelID && newState.channelID && oldState.channelID !== newState.channelID) {
            bot.writeLog(EmbedType.MOVE_VOICE_CONNECTION, member.user, `${member.user.username} vient de se déplacer dans le canal **${newChannel.name}**.`);
        }
    }
};
