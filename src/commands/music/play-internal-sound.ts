import { createAudioPlayer, createAudioResource, getVoiceConnection } from '@discordjs/voice';
import fs from 'fs';
import * as path from 'path';
import { Bot } from '../../classes/discord/Bot';
import UserLevel from '../../enums/UserLevel';

module.exports = {
    name: 'play-internal-sound',
    commands: ['play-internal-sound'],
    description: {
        title: '[INTERNAL] Jouer un son local',
        args: [
            {
                name: 'soundName',
                required: true
            }
        ]
    },
    minLevel: UserLevel.INTERNAL,
    isVoiceCommand: true,
    args: false,

    async execute(bot: Bot, fileName: string) {
        if (fileName) {
            const connection = await getVoiceConnection(bot.bbscDiscord.id);

            if (connection) {
                const ressource = createAudioResource(path.resolve(__dirname, '../../../static/audio', fileName));

                connection.subscribe(bot.audioPlayer);
                bot.audioPlayer.play(ressource);
            }
        }
    }
};
