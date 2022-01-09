import { PathLike, createWriteStream, ReadStream } from 'fs';
import { IWriter } from './IWriter';

export class ToFile implements IWriter {
  protected _stream: ReadStream;

  protected _file: PathLike;

  public constructor(stream: ReadStream = new ReadStream(), file: PathLike = '') {
    this._stream = stream;
    this._file = file;
  }

  public setInput(value: ReadStream): ToFile {
    this._stream = value;

    return this;
  }

  public setFile(value: PathLike): ToFile {
    this._file = value;

    return this;
  }

  public async write(): Promise<void> {
    // const bytes = await this._stream.getReader();
    const dest = createWriteStream(this._file);

    this._stream.pipe(dest)

    // dest.write(bytes, (e) => {
    //   console.error('ToFile write() error: ', e);
    // });
  }
}