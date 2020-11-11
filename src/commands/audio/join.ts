import { Bot } from '../../classes/Bot';
import { Message, TextChannel } from 'discord.js';
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

const FFmpeg  = require('fluent-ffmpeg');
FFmpeg.setFfmpegPath(ffmpegPath);

const speechToText = new SpeechToTextV1({
    iam_apikey: process.env.WATSON_API_KEY,
    url: process.env.WATSON_SPEECH_TO_TEXT_URL
});

const path = require('path');

module.exports = {
    name: 'join',
    alias: ['bot-join'],
    description: '**/bot-join**: Demander au bot de se connecter au salon vocal',
    isInternal: false,
    isAdmin: false,
    isVoiceCommand: true,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        messageSended.member.voice.channel.join().then(async (connection) => {
            bot.currentVoiceConnection = connection;

/*             if (bot.voiceConnectionDispatcher !== null) {
                await bot.voiceConnectionDispatcher.end();
            }

            bot.voiceConnectionDispatcher = connection.play(path.resolve(__dirname, '../../../static/audio', 'silence.mp3'));

            const params = {
                objectMode: true,
                profanityFilter: false,
                contentType: 'audio/l16; rate=44100; channels=2'
            };
            
            connection.on('speaking', (user, speaking) => {
                const stream = bot.currentVoiceConnection.receiver.createStream(user, { mode: 'pcm' });
                // 'unknown' | 'converted' | 'opus' | 'ogg/opus' | 'webm/opus';
                // bot.currentVoiceConnection.play(stream, { type: 'opus', volume: 0.2, highWaterMark: 50 });

                stream.pipe(speechToText.recognizeUsingWebSocket(params).on('data', data => {

                    bot.channels.fetch(process.env.BOT_CHANNEL_ID).then((channel: TextChannel) => {
                        const embedMessage: EmbedMessage = new EmbedMessage(EmbedType.INFO, data.results[0].alternatives[0].transcript);
                        channel.send(embedMessage);
                    });
                    console.log(data.results[0].alternatives);
                }));
            }); */

            // const stream = bot.currentVoiceConnection.receiver.createStream(userToListenTo, {end: 'manual', mode: 'opus'});
        });
    }
};