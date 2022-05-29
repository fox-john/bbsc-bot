import { Channel, EmbedFieldData, TextChannel } from 'discord.js';
import { Bot } from './classes/discord/Bot';
import { EmbedMessage } from './classes/discord/EmbedMessage';

const bot = new Bot();

process.on('uncaughtException', (error: Error, _promise: Promise<any>) => {
    bot.bbscDiscord.channels.cache.get(process.env.BOT_ERROR_CHANNEL_ID).fetch().then((channel: Channel) => {
        if (channel.isText()) {
            const fields = [
                {
                    name: "Error",
                    value: error.toString().substring(0, 1024),
                    inline: false
                } as unknown as EmbedFieldData,
                {
                    name: "Stacktrace",
                    value: error.stack.toString().substring(0, 1024),
                    inline: false
                } as unknown as EmbedFieldData
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
        }
    });
});

bot.login(process.env.TOKEN);
