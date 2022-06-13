import { CommandHandler } from '../types';
import { getImageAsBuffer, readImage } from '../utils';

const flipY: CommandHandler = async (photoUrl: string) => {
  const image = await readImage(photoUrl);
  return getImageAsBuffer(image.flip());
};

export { flipY };
