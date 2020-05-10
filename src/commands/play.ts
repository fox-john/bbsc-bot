import { Bot } from '../Bot';
import { Message } from 'discord.js';
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'play sound from youtube',
    args: true,

    async execute(messageSended: Message, params: Array<string>) {
        const query: Array<string> = params[0] ? params[0].split('?') : null;
        let timecode: number = 0;
        if (query[1]) {
            const vars: Array<string> = query[1].split('&');
            const varMap: Map<string, string> = new Map();

            vars.forEach((singleVar) => {
                const currentVar: Array<string> = singleVar.split('=');
                varMap.set(currentVar[0], currentVar[1]);
            });

            if (varMap.has('t')) {
                timecode = parseInt(varMap.get('t')) * 1000;
            }
        }
        
        if (Bot.currentVoiceConnection !== null) {
            await Bot.commands.get('stop').execute(Bot.client);
        }

        if (query[0] !== null && ytdl.validateURL(query[0])) {
            Bot.currentVoiceConnection = await messageSended.member.voice.channel.join();

            Bot.voiceConnectionDispatcher = Bot.currentVoiceConnection.play(await ytdl(query[0], { type: 'opus', begin: timecode }), { volume: 0.1 });

            Bot.voiceConnectionDispatcher.on('finish', () => {
                Bot.voiceConnectionDispatcher.destroy();
                Bot.currentVoiceConnection.channel.leave();
              });
        } else {
            messageSended.reply('Aucun lien n\'a été donné, ou le lien ne correspond pas a un lien youtube !');
        }
    }
};
