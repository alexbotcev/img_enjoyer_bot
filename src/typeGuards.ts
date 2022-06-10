import { Message } from 'telegraf/typings/core/types/typegram';

const isPhotoMessage = (value: unknown): value is Message.PhotoMessage =>
  (value as Message.PhotoMessage)?.photo !== undefined;

export { isPhotoMessage };
