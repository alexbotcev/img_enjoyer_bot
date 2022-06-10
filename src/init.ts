import 'dotenv/config';
import { Telegraf } from 'telegraf';

const bot: Telegraf = new Telegraf(process.env.TELEGRAM_TOKEN as string);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export { bot };
