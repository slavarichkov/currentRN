/**
 * @typedef {Object} TranslationObject
 * @property {string} - Перевод.
 */

/**
 * @typedef {Object} Translate
 * @property {TranslationObject} ru - Русский язык.
 * @property {TranslationObject} en - Английский язык.
 */

/**
 * Объект с переводами для разных языков.
 * @type {Translate}
 * @example
 * const translate = {
 *   ru: {
 *     'hello': 'привет',
 *   },
 *   en: {
 *     'hello': 'hello',
 *   }
 * };
 */

interface Translates {
    [lang: string]: {
        [key: string]: string;
    };
}

const translates: Translates = {
    ru: {
        hello: 'привет',
    },
    en: {
        hello: 'hello',
    }
}

export { translates };
