import { ReadStream } from "fs";

export interface IWriter {
  setInput(value: ReadStream): IWriter;
  write(): Promise<void>;
}
