import { ReadStream } from 'fs';

export interface ITranslator {
  read(): Promise<ReadStream>;
}
