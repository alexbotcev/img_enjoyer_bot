import { getImageAsBuffer, readImage } from '../utils';
import { CommandHandler } from '../types';

const flip: CommandHandler = async (photoUrl: string) => {
  const image = await readImage(photoUrl);
  return getImageAsBuffer(image.flip().flop());
};

export { flip };
