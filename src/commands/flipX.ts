import { CommandHandler } from '../types';
import { getImageAsBuffer, readImage } from '../utils';

const flipX: CommandHandler = async (photoUrl: string) => {
  const image = await readImage(photoUrl);
  return getImageAsBuffer(image.flop());
};

export { flipX };
