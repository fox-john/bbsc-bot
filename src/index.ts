import { EmbedFieldData, TextChannel } from 'discord.js';
import { Bot } from './classes/Bot';
import { EmbedMessage } from './classes/EmbedMessage';

const bot = new Bot();

process.on('uncaughtException',  (error, promise) => {
    bot.bbscDiscord.channels.cache.get(process.env.BOT_ERROR_CHANNEL_ID).fetch().then((channel: TextChannel) => {
        const fields = [
            {
                name: "Error",
                value: error.toString(),
                inline: false
            } as unknown as EmbedFieldData,
            {
                name: "Stacktrace",
                value: error.stack.toString(),
                inline: false
            }
        ]

        const errorMessage: EmbedMessage = new EmbedMessage({
            color: '#FF0000',
            title: 'An error has occurred',
            fields,
            user: bot.user
        });

        channel.send(errorMessage).then(() => {
            process.exit(1);
        });
    });
});

bot.login(process.env.TOKEN);
