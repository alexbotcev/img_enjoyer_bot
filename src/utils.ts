import sharp, { Sharp } from 'sharp';
import fetch from 'node-fetch';

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

const stringToNumber = (param?: string): number | undefined =>
  param !== undefined ? parseInt(param) : param;

const downloadImage = async (url: string): Promise<ArrayBuffer> =>
  fetch(url).then(result => result.arrayBuffer());

const readImage = async (url: string): Promise<Sharp> => {
  const buffer = await downloadImage(url);
  return sharp(new Uint8Array(buffer));
};

const getImageAsBuffer = (file: Sharp): Promise<Buffer> => file.toBuffer();

export {
  getImageAsBuffer,
  getFullSizeImage,
  getTextFromMsg,
  readImage,
  parseTextFromMsg,
  isExistCommand,
  downloadImage,
  stringToNumber,
};
