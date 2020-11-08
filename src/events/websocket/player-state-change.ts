import { Bot } from '../../classes/Bot';
import { EmbedType } from "../../classes/EmbedMessage";
import PlayerAction from "../../enums/among-us/PlayerAction";
import { GuildMember } from "discord.js";
import WebSocketServer from '../../classes/WebSocketServer';

module.exports = {
    name: 'player',

    execute: (bot: Bot, event: WebSocketServer, params: any) => {
        const playerInfos = JSON.parse(params);
        const server = bot.guilds.cache.get(process.env.BBSC_GUILD_ID);
        const member: GuildMember = server.members.cache.find((member) => member.user.username === playerInfos.Name);

        switch(parseInt(playerInfos.Action)) {
            case PlayerAction.JOIN:
            case PlayerAction.FORCE_UPDATE:
                Bot.amongUsGame.addPlayer(playerInfos, member);
                break;
            case PlayerAction.DISCONNECT:
            case PlayerAction.LEAVE:
                Bot.amongUsGame.removePlayer(playerInfos);
                break;
            case PlayerAction.EXILE:
            case PlayerAction.KILL:
                Bot.amongUsGame.killPlayer(playerInfos.Name);
                break;
            default:
                break;
        }
    }
}
