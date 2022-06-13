import { getImageAsBuffer, readImage, stringToNumber } from '../utils';
import { CommandHandler } from '../types';

const rotate: CommandHandler<string> = async (photoUrl: string, angle) => {
  const image = await readImage(photoUrl);
  return getImageAsBuffer(image.rotate(stringToNumber(angle)));
};

export { rotate };
