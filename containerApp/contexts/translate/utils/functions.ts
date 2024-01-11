import * as Localization from 'react-native-localize';
import { getLocaleFromAsyncStorage, saveLocaleToAsyncStorage } from '../../../utils/db/asyncStorege/AsyncStore';
import { translates } from '../../../utils/dictionary';


// Определение типа для объекта с локализациями
interface LocalizationItem {
    key: string;
    locale: string;
}

const arrayLocalizations: LocalizationItem[] = [
    { key: 'ru', locale: 'ru' },
    { key: 'en', locale: 'en' },
];

// Получить Локализацию
/**
 * Получает текущую локаль пользователя. Если локаль уже сохранена в AsyncStorage,
 * возвращает ее. В противном случае, сохраняет текущую локаль в AsyncStorage и
 * возвращает ее значение.
 *
 * @async
 * @function
 * @returns {Promise<string>} Текущая локаль пользователя.
 * @throws {Error} Если возникают ошибки при работе с AsyncStorage или другие ошибки.
 * 
 * @example
 * const userLocale = await getLocaleUser();
 * console.log(userLocale); // Выводит текущую локаль пользователя.
 */

async function getLocaleUser(): Promise<string> {
    let currentLocale: string = Localization.getLocales()[0].languageCode;
    const locale = await getLocaleFromAsyncStorage();
    if (locale) {
        currentLocale = locale;
    } else {
        await saveLocaleToAsyncStorage(currentLocale);
    }
    return currentLocale;
}

// Определение типа для объекта с переводами
interface TypeTranslateObject {
    [key: string]: string;
}

/**
  * Получает перевод для текущей локали пользователя и возвращает его.
  * Если перевод для текущей локали не найден, использует язык по умолчанию (английский).
  *
  * @async
  * @function
  * @throws {Error} Если возникают ошибки при получении локали пользователя, поиске перевода
  *                или установке перевода.
  * 
  * @example
  * await getTranslation();
  */
async function getTranslation(): Promise<TypeTranslateObject> {
    try {
        let locale = await getLocaleUser(); // Возвращает локаль пользователя
        let translateLocale = 'en';
        const foundTranslate = arrayLocalizations.find((item) => locale.includes(item.key));

        if (foundTranslate) {
            translateLocale = foundTranslate.locale;
        }

        const translate: TypeTranslateObject = translates[translateLocale];

        return translate;
    } catch (error) {
        console.error('Произошла ошибка при получении перевода:', error);
        throw error; // Переброс ошибки для обработки выше, если необходимо
    }
}

/**
 * Изменяет локаль пользователя, сохраняя ее в AsyncStorage и устанавливая новую локаль. Возвращает новую локаль
 *
 * @async
 * @function
 * @param {string} updateLocale - Новая локаль для пользователя.
 * @returns {Promise<string>} Обновленная локаль пользователя.
 * @throws {Error} Если возникают ошибки при сохранении локали в AsyncStorage или установке локали.
 * 
 * @example
 * const newLocale = 'es';
 * await changeLocaleUser(newLocale);
 * // Изменяет локаль пользователя на 'es' и возвращает новую локаль.
 */
async function changeLocaleUser(updateLocale: string): Promise<string> {
    try {
        await saveLocaleToAsyncStorage(updateLocale);
        return updateLocale;
    } catch (error) {
        console.error('Произошла ошибка при изменении локали пользователя:', error);
        throw error; // Переброс ошибки для обработки выше, если необходимо
    }
}

export { getLocaleUser, getTranslation, changeLocaleUser }