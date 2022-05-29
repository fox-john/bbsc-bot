import { getVoiceConnection } from '@discordjs/voice';
import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'stop',
    commands: ['stop', 'leave'],
    description: {
        title: 'Demander au bot de quitter le channel vocal',
        args: []
    },
    minLevel: UserLevel.USER,
    isVoiceCommand: true,
    args: true,

    async execute(bot: Bot) {
        const connection = await getVoiceConnection(bot.bbscDiscord.id);

        if (connection) {
            await connection.destroy();
        }
    },
};
