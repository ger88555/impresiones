import { ReadStream } from 'fs';
import { create, CreateOptions } from 'html-pdf';
import { ITranslator } from './ITranslator';

export class FromHTML implements ITranslator {
  protected _html: string;

  protected _vars: object;

  protected _opts: CreateOptions = { format: 'Letter' };

  public constructor(html: string = '', vars: object = {}, opts: CreateOptions = { format: 'Letter' }) {
    this._html = html;
    this._vars = vars;
    this._opts = opts;
  }

  public setHtml(value: string) {
    this._html = value;
  }

  public setVars(value: object) {
    this._vars = value;
  }

  public setOptions(value: CreateOptions) {
    this._opts = value;
  }

  public read(): Promise<ReadStream> {
    const replacedHTML = this.getReplaced();

    const action = new Promise<ReadStream>((resolve, reject) => {

        create(replacedHTML, this._opts).toStream((err, s) => {
          if (err) reject(err)
    
          else resolve(s)
        });

    })
    .catch(err => {
        console.error('FromHTML read() error: ', err);

        throw err;
    })

    return action;
  }

  protected getReplaced(): string {
    let result = this._html;

    for (const [name, value] of Object.entries(this._vars)) {
      result = result.replace(this.getReplaceRegexp(name), value);
    }

    return result;
  }

  protected getReplaceRegexp = (name: string) => new RegExp(`{{\\s*${name}\\s*}}`, 'g');
}