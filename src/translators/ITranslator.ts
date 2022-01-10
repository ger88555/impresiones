import { ReadStream } from 'fs';

interface ITranslator {
  read(): Promise<ReadStream>;
}

export default ITranslator