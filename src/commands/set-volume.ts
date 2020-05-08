import { Bot } from '../Bot';
import { Message } from 'discord.js';

module.exports = {
	name: 'setvolume',
	description: 'Set play volume',
    args: true,

	execute(client: Bot, messageSended: Message, params: Array<string>) {
		const volume: number = params[0] ? parseInt(params[0]) : 0.1;
		
		if (Bot.voiceConnectionDispatcher !== null) {
			const finalVolume = volume / 10;

			if (finalVolume > 0.0 && finalVolume <= 1.0) {
				Bot.voiceConnectionDispatcher.setVolume(volume);
			} else {
				console.log('Volume is to high !')
			}
		}
	},
};