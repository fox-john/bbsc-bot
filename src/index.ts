import { Bot } from './classes/Bot';

const bot = new Bot();
bot.login(process.env.TOKEN);