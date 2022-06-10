import { getImageAsBuffer, readImage } from '../utils';
import { CommandHandler } from '../types';

const flip: CommandHandler<[boolean, boolean]> = async (
  photoUrl: string,
  direction: [boolean, boolean] = [true, true]
) => {
  const image = await readImage(photoUrl);
  return getImageAsBuffer(image.flip(...direction));
};

export { flip };
