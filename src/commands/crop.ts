import { getImageAsBuffer, readImage } from '../utils';
import { CommandHandler } from '../types';

const crop: CommandHandler<string> = async (
  photoUrl: string,
  offsetX: string,
  offsetY: string,
  width: string,
  height: string
) => {
  const image = await readImage(photoUrl);
  return getImageAsBuffer(image.crop(+offsetX, +offsetY, +width, +height));
};

export { crop };
