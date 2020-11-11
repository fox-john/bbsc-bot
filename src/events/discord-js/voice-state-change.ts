import { VoiceState, VoiceChannel, GuildMember, VoiceReceiver } from "discord.js";
import { Bot } from '../../classes/Bot';
const fs = require('fs');

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

            if (newState.channelID === process.env.AMONG_US_CHANNEL_ID && !newState.channel.members.has('522189169829871631')) {
                newState.member.voice.channel.join().then((voiceConnection) => {
                    bot.currentVoiceConnection = voiceConnection;
                });
            }

            if (oldState.channelID && newState.channelID && oldState.channelID !== newState.channelID && oldState.channel.members.array().length === 1 && oldState.channel.members.has('522189169829871631')) {
                bot.commands.get('stop').execute(bot);
            }

        } else if (oldState.channel.members.array().length === 1 && oldState.channel.members.has('522189169829871631')) {
            bot.commands.get('stop').execute(bot);
        }

        if (!oldState.channelID && newState.channelID) {
            bot.writeLog('info', `${member.user.username} vient de se connecter du canal ${newChannel.name}`);
        } else if (oldState.channelID && !newState.channelID) {
            bot.writeLog('info', `${member.user.username} vient de se deconnecter du canal ${oldChannel.name}`);
        } else if (oldState.channelID && newState.channelID && oldState.channelID !== newState.channelID) {
            bot.writeLog('info', `${member.user.username} vient de se deplacer dans le canal ${newChannel.name}`);
        }
    }
};
