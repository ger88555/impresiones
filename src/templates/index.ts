import { join } from 'path';
import { readFileSync } from 'fs';
import { TemplateName } from '../types';

/**
 * Get the specified template from this directory.
 *
 * @param template Template filename.
 * @returns {string}
 */
export const get = (template: typeof TemplateName): string =>
  readFileSync(join(__dirname, `${template}.html`)).toString('utf-8');
