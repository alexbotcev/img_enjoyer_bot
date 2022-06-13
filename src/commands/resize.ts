import { getImageAsBuffer, readImage, stringToNumber } from '../utils';
import { CommandHandler } from '../types';
import { ResizeOptions } from 'sharp';

const resize: CommandHandler<string> = async (photoUrl: string, width: string, height: string) => {
  const image = await readImage(photoUrl);
  const options: ResizeOptions = {
    width: stringToNumber(width),
    height: stringToNumber(height),
    fit: 'fill',
  };

  return getImageAsBuffer(image.resize(options));
};

export { resize };
