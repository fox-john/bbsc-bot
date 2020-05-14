import { Bot } from './Bot';
import { Igdb } from './Igdb';

const bot = new Bot();
bot.login(process.env.TOKEN);