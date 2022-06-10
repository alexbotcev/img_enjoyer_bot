import { bot } from './init';
import { getFullSizeImage, getTextFromMsg, parseTextFromMsg, isExistCommand } from './utils';
import { COMMANDS } from './commands';
import { ExecutePayload, TelegramContext, TelegramMsg } from './types';

const execute = async (ctx: TelegramContext, payload: ExecutePayload) => {
  const { command, image, args = [] } = payload;

  try {
    const { href } = await ctx.telegram.getFileLink(image.file_id);
    const buffer = await COMMANDS[command](href, ...args);
    await ctx.replyWithPhoto({ source: buffer });
  } catch (error) {
    console.trace(`[${command}]:`, error);
  }
};

Object.keys(COMMANDS).forEach(key => {
  bot.command(key, async ctx => {
    const image = getFullSizeImage(ctx.message.reply_to_message as TelegramMsg);
    const [command, ...args] = parseTextFromMsg(getTextFromMsg(ctx.message));

    if (image && isExistCommand(command)) {
      await execute(ctx, { command, image, args });
    }
  });
});

bot.on('photo', async ctx => {
  const image = getFullSizeImage(ctx.update.message);
  const [command, ...args] = parseTextFromMsg(getTextFromMsg(ctx.message));

  if (image && isExistCommand(command)) {
    await execute(ctx, { command, image, args });
  }
});

bot.launch();
