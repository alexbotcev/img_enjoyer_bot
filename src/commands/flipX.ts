import { flip } from './flip';
import { CommandHandler } from '../types';

const flipX: CommandHandler<undefined> = async (photoUrl: string) => flip(photoUrl, [true, false]);

export { flipX };
