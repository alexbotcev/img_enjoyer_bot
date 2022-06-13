import { getImageAsBuffer, readImage, stringToNumber } from '../utils';
import { CommandHandler } from '../types';
import { Region } from 'sharp';

const crop: CommandHandler<string> = async (
  photoUrl: string,
  offsetX: string,
  offsetY: string,
  width: string,
  height: string
) => {
  const region: Region = {
    left: stringToNumber(offsetX) ?? 0,
    top: stringToNumber(offsetY) ?? 0,
    width: stringToNumber(width) ?? 0,
    height: stringToNumber(height) ?? 0,
  };

  const image = await readImage(photoUrl);
  return getImageAsBuffer(image.extract(region));
};

export { crop };
