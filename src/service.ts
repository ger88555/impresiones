import { ReadStream } from 'fs';
import { FromHTML } from './translators';
import { IWriter, ToFile } from './writers';
import * as templates from './templates';

class ServiceSingleton {
    protected static instance: ServiceSingleton;

    /**
     * The HTML Template.
     */
    protected _template: string;

    /**
     * Variables to use in the Template.
     */
    protected _variables: object;

    /**
     * The writer instance.
     */
    protected _writer: IWriter

    /**
     * The ServiceSingleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    protected constructor() {
        this._template  = '';
        this._variables = {};
        this._writer    = new ToFile
    }

    public setTemplate(template: string): ServiceSingleton {
        this._template = template;

        return this;
    }

    public setVariables(variables: object): ServiceSingleton {
        this._variables = variables;

        return this;
    }

    public setWriter(writer: IWriter): ServiceSingleton {
        this._writer = writer;
        
        return this;
    }

    public static getInstance(): ServiceSingleton {
        if (!ServiceSingleton.instance) {
            ServiceSingleton.instance = new ServiceSingleton();
        }

        return ServiceSingleton.instance;
    }

    public useTicket() : ServiceSingleton {
        this._template = templates.get('ticket');

        return this;
    }

    /**
     * Read the current template and variables into a PDF stream.
     * 
     * @returns Promise of data ready for printing.
     */
    public async read(): Promise<ReadStream> {
        return await new FromHTML(this._template, this._variables).read()
    }

    /**
     * Write a PDF stream using the current writer.
     * 
     * @param data The PDF stream.
     * @returns 
     */
    public async write(data: ReadStream): Promise<void> {
        return await this._writer.setInput(data).write()
    }

    /**
     * Perform a printing job with the current settings.
     * 
     * @param template Optional. Specify an HTML template.
     * @returns 
     */
    public async print(template: string = ''): Promise<ServiceSingleton> {
        if (template.length) this.setTemplate(template)

        const data = await this.read()

        await this.write(data)        

        return this;
    }
}

export default ServiceSingleton