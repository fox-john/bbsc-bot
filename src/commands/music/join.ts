import { Message, VoiceChannel } from 'discord.js';
import { Bot } from '../../classes/Bot';
import UserLevel from '../../enums/UserLevel';

const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const FFmpeg  = require('fluent-ffmpeg');
const path = require('path');
/*
const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({ apikey: process.env.WATSON_API_KEY }),
    url: process.env.WATSON_SPEECH_TO_TEXT_URL
});
FFmpeg.setFfmpegPath(ffmpegPath);
let enableRecognition = false; */

module.exports = {
    name: 'join',
    commands: ['join', 'connect'],
    description: {
        title: 'Demander au bot de se connecter au salon vocal',
        args: []
    },
    minLevel: UserLevel.MODERATOR,
    isVoiceCommand: true,
    args: false,

    execute(bot: Bot, messageSended: Message) {
        const channel = messageSended ? messageSended.member.voice.channel : bot.channels.cache.get(process.env.AMONG_US_CHANNEL_ID) as VoiceChannel;

        channel.join().then(async (connection) => {
            bot.currentVoiceConnection = connection;

            if (bot.voiceConnectionDispatcher !== null) {
                await bot.voiceConnectionDispatcher.end();
            }

            bot.voiceConnectionDispatcher = connection.play(path.resolve(__dirname, '../../../static/audio', 'silence.mp3'));

            /*  const params = {
                model: 'fr-FR_BroadbandModel',
                objectMode: true,
                profanityFilter: false,
                contentType: 'audio/l16; rate=44100; channels=2'
            };

            connection.on('speaking', (user, speaking) => {
                const stream = bot.currentVoiceConnection.receiver.createStream(user, { mode: 'pcm' });
                // 'unknown' | 'converted' | 'opus' | 'ogg/opus' | 'webm/opus';
                // bot.currentVoiceConnection.play(stream, { type: 'opus', volume: 0.2, highWaterMark: 50 });
                stream.pipe(speechToText.recognizeUsingWebSocket(params).on('data', data => {
                    if (data.results[0]) {
                        const result = data.results[0].alternatives[0];
                        const channel = bot.channels.cache.get(process.env.BOT_CHANNEL_ID) as TextChannel;

                        if (result.transcript.trim() === 'désactive le reconnaissance vocale') {
                            enableRecognition = false;
                            bot.currentVoiceConnection.play(fs.createReadStream(path.resolve(__dirname, '../../../static/audio', 'mute.ogg')), { type: 'ogg/opus' });
                        }

                        if (enableRecognition) {
                            const embedMessage: EmbedMessage = new EmbedMessage({
                                color: '#006eff',
                                title: 'Reconnaissance vocale',
                                message: '',
                                fields: [
                                    { name: 'transcription', value: result.transcript },
                                    { name: 'confidence', value: result.confidence },
                                ],
                                user
                            });
                            channel.send(embedMessage);
                        }

                        if (result.transcript.trim() === 'active la reconnaissance vocale') {
                            enableRecognition = true;
                            bot.currentVoiceConnection.play(fs.createReadStream(path.resolve(__dirname, '../../../static/audio', 'unmute.ogg')), { type: 'ogg/opus' });
                        }
                    }
                }));
            }); */

            // const stream = bot.currentVoiceConnection.receiver.createStream(userToListenTo, {end: 'manual', mode: 'opus'});
        });
    }
};
