import { NarrowedContext, Context } from 'telegraf';
import { Message, PhotoSize } from 'telegraf/typings/core/types/typegram';
import { MountMap } from 'telegraf/typings/telegram-types';

type Command = 'flip' | 'flipX' | 'flipY' | 'resize' | 'crop' | 'rotate' | 'addText';
type CommandHandler<T = undefined> = (url: string, ...args: T[]) => Promise<Buffer>;
type CommandWithArgs = [Command, ...unknown[]];

type TelegramContext =
  | NarrowedContext<Context, MountMap['photo']>
  | NarrowedContext<Context, MountMap['text']>;
type TelegramImageFromMsg = PhotoSize;
type TelegramMsg = Message.PhotoMessage | Message.TextMessage;

type ExecutePayload = {
  command: Command;
  image: TelegramImageFromMsg;
  args?: unknown[];
};

export type {
  Command,
  CommandHandler,
  CommandWithArgs,
  ExecutePayload,
  TelegramContext,
  TelegramMsg,
  TelegramImageFromMsg,
};
