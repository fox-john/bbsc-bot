import { Message } from 'discord.js';
import { EmbedMessage } from '../../classes/EmbedMessage';
import { Bot } from '../../classes/Bot';
import { Igdb, IgdbSearchType } from '../../classes/Igdb';

module.exports = {
    name: 'igdb',
    alias: [],
    description: '**/igdb**: Voir la liste des jeux qui sortent bientôt',
    args: false,

    async execute(bot: Bot, messageSended: Message, params: Array<string>) {
        const igdbRequest = new Igdb();
        const searchtype = params[0] ? params[0] : IgdbSearchType.COMMING_SOON;
        const searchPage = params[1] ? parseInt(params[1]) : 1;
        const igdbResponse: Array<any> = await igdbRequest.search(searchtype, searchPage);
        let finalText = '';

        igdbResponse.forEach((game) => {
            const date = new Date(game.first_release_date * 1000);
            const dateFormatted = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`
            finalText += `**[${dateFormatted}]**: ${game.name}  \n`;
        });
        const embedMessage: EmbedMessage = new EmbedMessage('Sortie récente de jeu (triés par hype)', finalText);

        messageSended.reply(embedMessage);
    }
};