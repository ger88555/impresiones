import Service from './service';

export * from './translators/ITranslator';
export * from './translators/FromHTML';
export * from './writers/IWriter';
export * from './writers/ToFile'

export default Service.getInstance;
