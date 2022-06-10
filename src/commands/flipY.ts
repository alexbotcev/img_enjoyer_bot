import { flip } from './flip';
import { CommandHandler } from '../types';

const flipY: CommandHandler<undefined> = async (photoUrl: string) => flip(photoUrl, [false, true]);

export { flipY };
