import { GuildMember, Role } from "discord.js";
import { Bot } from "../Bot";
const path = require('path');

module.exports = {
    name: 'guildMemberUpdate',

    execute: (bot: Bot, oldMemberInfos: GuildMember, newMemberInfos: GuildMember) => {
        const amongUsRole: Role = oldMemberInfos.guild.roles.cache.find(role => role.name === 'Mort Among Us');

        if (!oldMemberInfos.roles.cache.has(amongUsRole.id) && newMemberInfos.roles.cache.has(amongUsRole.id) && newMemberInfos.voice.channel) {
            if (bot.currentVoiceConnection) {
                bot.currentVoiceConnection.play(path.resolve(__dirname, '../..', 'static', 'audio', 'unmute.mp3'));
            }
    
            newMemberInfos.voice.channel.members.forEach((member: GuildMember) => {
                if (!member.roles.cache.has(process.env.AMONG_US_ROLE_ID)) {
                    member.voice.setMute(false);
                } else {
                    member.voice.setMute(true);
                }
            });
        } else if (oldMemberInfos.roles.cache.has(amongUsRole.id) && !newMemberInfos.roles.cache.has(amongUsRole.id) && newMemberInfos.voice.channel) {
            newMemberInfos.roles.remove(process.env.AMONG_US_ROLE_ID);
            newMemberInfos.voice.setMute(false);
        }
    }
};