import { Command, CommandHandler } from '../types';
import { flip } from './flip';
import { flipX } from './flipX';
import { flipY } from './flipY';
import { resize } from './resize';
import { crop } from './crop';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const COMMANDS: Record<Command, CommandHandler<any>> = {
  flip,
  flipX,
  flipY,
  resize,
  crop,
};

export { COMMANDS };
