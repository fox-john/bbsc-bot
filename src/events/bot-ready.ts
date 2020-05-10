import { Client } from "discord.js";

module.exports = {
    name: 'ready',

    execute: (client: Client) => {
        console.log('Bot is ready !');
    }
} 