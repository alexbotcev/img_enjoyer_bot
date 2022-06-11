import Jimp from 'jimp';

import { getImageAsBuffer, readImage } from '../utils';
import { CommandHandler } from '../types';

const resize: CommandHandler<string> = async (
  photoUrl: string,
  width: string,
  height: string | number = Jimp.AUTO
) => {
  const image = await readImage(photoUrl);
  return getImageAsBuffer(image.resize(+width, +height));
};

export { resize };
