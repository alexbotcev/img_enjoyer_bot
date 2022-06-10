import { Command, CommandHandler } from '../types';
import { flip } from './flip';
import { flipX } from './flipX';
import { flipY } from './flipY';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const COMMANDS: Record<Command, CommandHandler<any>> = {
  flip,
  flipX,
  flipY,
};

export { COMMANDS };
