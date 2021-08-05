import { VoiceState } from "discord.js";
import { Bot } from '../../classes/discord/Bot';

module.exports = {
    name: 'voiceStateUpdate',

    execute: (bot: Bot, oldState: VoiceState, newState: VoiceState) => {
        if (oldState.member.user.bot) return;

        const member = newState.member;

        // AMONG US
        if ((!oldState.channelID && newState.channelID) || (oldState.channelID && newState.channelID && oldState.channelID !== newState.channelID)) {
            if (newState.channelID === process.env.AMONG_US_CHANNEL_ID && !newState.channel.members.has((process.env.BBSC_BOT_ID))) {
                bot.commands.get('join').execute(bot);
            }

            if (oldState.channelID && newState.channelID && oldState.channelID !== newState.channelID && oldState.channel.members.array().length === 1 && oldState.channel.members.has(process.env.BBSC_BOT_ID)) {
                bot.commands.get('stop').execute(bot);
            }
        } else if (oldState.channel.members.array().length === 1 && oldState.channel.members.has(process.env.BBSC_BOT_ID)) {
            bot.commands.get('stop').execute(bot);
        }
    }
};
