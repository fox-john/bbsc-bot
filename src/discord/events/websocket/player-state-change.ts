import chalk from "chalk";
import { GuildMember } from "discord.js";
import { Bot } from '../../classes/discord/Bot';
import WebSocketServer from '../../classes/WebSocketServer';
import PlayerAction from "../../enums/among-us/PlayerAction";

module.exports = {
    name: 'player',

    execute: (bot: Bot, event: WebSocketServer, params: any) => {
        const playerInfos = JSON.parse(params);

        console.log(`new state for player: ${params}`);

        let member: GuildMember = bot.bbscDiscord.members.cache.find((member) => {
            return playerInfos.Name === member.user.username;
        });

        if (!member) {
            member = bot.bbscDiscord.members.cache.find((member) => {
                return playerInfos.Name === member.nickname;
            });
        }

        switch(parseInt(playerInfos.Action)) {
            case PlayerAction.JOIN:
            case PlayerAction.FORCE_UPDATE:
                Bot.amongUsGame.addPlayer(bot, playerInfos, member);
                break;
            case PlayerAction.DISCONNECT:
            case PlayerAction.LEAVE:
                Bot.amongUsGame.removePlayer(bot, playerInfos);
                break;
            case PlayerAction.EXILE:
            case PlayerAction.KILL:
                Bot.amongUsGame.killPlayer(bot, playerInfos.Name);
                break;
            default:
                break;
        }
    }
}
