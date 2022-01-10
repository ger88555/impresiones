import { ReadStream } from "fs";

interface IWriter {
  setInput(value: ReadStream): IWriter;
  write(): Promise<void>;
}

export default IWriter