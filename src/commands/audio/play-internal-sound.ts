import { SlashCommandBuilder } from '@discordjs/builders';
import { createAudioPlayer, createAudioResource, getVoiceConnection } from '@discordjs/voice';
import fs from 'fs';
import * as path from 'path';
import { Bot } from '../../classes/discord/Bot';

const infos = new SlashCommandBuilder()
    .setName('play-internal-sound')
    .setDescription('play sound from server')
    .addStringOption((option) => {
        return option
            .setName('filename')
            .setDescription('filename you want to play')
            .setRequired(true)
    });

module.exports = {
    infos,
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
