import Jimp from 'jimp';

import { CommandWithArgs, TelegramMsg, TelegramImageFromMsg, Command } from './types';
import { isPhotoMessage } from './typeGuards';
import { COMMANDS } from './commands';

const isExistCommand = (command: Command): boolean => command in COMMANDS;

const getFullSizeImage = (message?: TelegramMsg): TelegramImageFromMsg | undefined =>
  isPhotoMessage(message) ? message?.photo.at(-1) : undefined;

const getTextFromMsg = (message: TelegramMsg): string =>
  (isPhotoMessage(message) ? message.caption : message.text) ?? '';

const parseTextFromMsg = (caption: string): CommandWithArgs =>
  caption.trim().slice(1).split(' ') as CommandWithArgs;

const readImage = (url: string): Promise<Jimp> => Jimp.read(url);

const getImageAsBuffer = (file: Jimp): Promise<Buffer> => file.getBufferAsync(file.getMIME());

export {
  getImageAsBuffer,
  getFullSizeImage,
  getTextFromMsg,
  readImage,
  parseTextFromMsg,
  isExistCommand,
};
