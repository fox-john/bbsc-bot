import { Bot } from '../Bot';
import { Message } from 'discord.js';
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'play sound from youtube',
    args: true,

	async execute(client: Bot, messageSended: Message, params: Array<string>) {
        const sound: string = params[0] ? params[0] : null;

        if (Bot.currentVoiceConnection !== null) {
            await Bot.commands.get('stop').execute(client);
        }

        if (sound !== null) {
            Bot.currentVoiceConnection = await messageSended.member.voice.channel.join();

            Bot.voiceConnectionDispatcher = Bot.currentVoiceConnection.play(ytdl(sound, { filter: 'audioonly'}), { volume: 0.1 });

            Bot.voiceConnectionDispatcher.on('finish', () => {
                Bot.voiceConnectionDispatcher.destroy();
                Bot.currentVoiceConnection.channel.leave();
              });
        } else {
            messageSended.reply('Aucun lien n\'a été donné');
        }   
	}
};
