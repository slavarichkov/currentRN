import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Функция для сохранения Expo Push Token в AsyncStorage
async function savePushTokenToAsyncStorage(pushToken) {
    try {
        await AsyncStorage.setItem('pushToken', pushToken);
    } catch (error) {
        console.error('Ошибка при сохранении Push Token в AsyncStorage:', error);
    }
}

// Функция для получения Expo Push Token из AsyncStorage
async function getPushTokenFromAsyncStorage() {
    try {
        const pushToken = await AsyncStorage.getItem('pushToken');
        return pushToken;
    } catch (error) {
        console.error('Ошибка при получении Push Token из AsyncStorage:', error);
        return null;
    }
}

// Генерировать уникальный deviceId и сохранить его в asyncStorage
const generateAndSaveDeviceId = async () => {
    try {
        // Попытка получения существующего deviceId из asyncStorage
        const existingDeviceId = await AsyncStorage.getItem('deviceId');

        if (existingDeviceId) {
            // Если deviceId уже существует, вернуть его
            return existingDeviceId;
        } else {
            // Если deviceId не существует, сгенерировать новый и сохранить в asyncStorage
            const newDeviceId = uuidv4(); // Генерировать новый уникальный deviceId
            await AsyncStorage.setItem('deviceId', newDeviceId); // Сохранить в asyncStorage
            return newDeviceId; // Вернуть новый deviceId
        }
    } catch (error) {
        // Обработка ошибки при сохранении или получении данных из asyncStorage
        console.error('Ошибка при работе с asyncStorage:', error);
        return null; // Вернуть null в случае ошибки
    }
};

// Получить deviceId из asyncStorage
const getDeviceId = async () => {
    try {
        const deviceId = await AsyncStorage.getItem('deviceId');
        return deviceId;
    } catch (error) {
        // Обработка ошибки при получении данных из asyncStorage
        console.error('Ошибка при получении deviceId из asyncStorage:', error);
        return null; // Вернуть null в случае ошибки
    }
};

/**
 * Функция для сохранения значения "locale" в Async Storage.
 *
 * @param {string} locale - Значение локали для сохранения.
 * @returns {Promise<void>} Промис без результата.
 */
const saveLocaleToAsyncStorage = async (locale: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('locale', locale);
        console.log('Значение "locale" успешно сохранено в Async Storage');
    } catch (error) {
        console.error('Произошла ошибка при сохранении "locale" в Async Storage:', error);
        throw error; // Переброс ошибки для обработки выше, если необходимо
    }
};

/**
 * Функция для получения значения "locale" из Async Storage.
 *
 * @returns {Promise<string | null>} Промис с значением локали или null, если значение не найдено.
 */
const getLocaleFromAsyncStorage = async (): Promise<string | null> => {
    try {
        const locale = await AsyncStorage.getItem('locale');
        if (locale !== null) {
            console.log('Значение "locale" извлечено из Async Storage:', locale);
            return locale;
        } else {
            console.log('Значение "locale" не найдено в Async Storage.');
            return null;
        }
    } catch (error) {
        console.error('Произошла ошибка при получении "locale" из Async Storage:', error);
        return null;
    }
};

/**
 * Функция для сохранения значения "isPermissionLocation" в Async Storage.
 *
 * @param {string | boolean} isPermission - Значение разрешения для местоположения.
 * @returns {Promise<void>} Промис без результата.
 */
const savePermissionLocation = async (isPermission: string | boolean): Promise<void> => {
    try {
        await AsyncStorage.setItem('isPermissionLocation', String(isPermission));
        console.log('Значение "isPermissionLocation" успешно сохранено в Async Storage');
    } catch (error) {
        console.error('Произошла ошибка при сохранении "isPermissionLocation" в Async Storage:', error);
        throw error; // Переброс ошибки для обработки выше, если необходимо
    }
};

/**
 * Функция для получения значения "isPermissionLocation" из Async Storage.
 *
 * @returns {Promise<string | null>} Промис с значением разрешения для местоположения или null, если значение не найдено.
 */
const getPermissionLocation = async (): Promise<string | null> => {
    try {
        const isPermissionLocation = await AsyncStorage.getItem('isPermissionLocation');

        if (isPermissionLocation !== null) {
            console.log('Значение "isPermissionLocation" извлечено из Async Storage:', isPermissionLocation);
            return isPermissionLocation;
        } else {
            console.log('Значение "isPermissionLocation" не найдено в Async Storage и записано как false');
            await AsyncStorage.setItem('isPermissionLocation', 'false');
            return 'false';
        }
    } catch (error) {
        console.error('Произошла ошибка при получении "isPermissionLocation" из Async Storage:', error);
        return null;
    }
};

/**
 * Сохраняет массив названий счетчиков в Async Storage.
 *
 * @param {string[]} counterNames - Массив названий счетчиков.
 * @returns {Promise<void>} Промис, который разрешается после успешного сохранения данных в Async Storage.
 *
 * @example
 * // Пример использования:
 * const counterNamesArray = ['Counter 1', 'Counter 2', 'Counter 3'];
 * saveCountersToAsyncStorage(counterNamesArray);
 */
const saveCountersToAsyncStorage = async (counterNames: string[]): Promise<void> => {
    try {
        const jsonString = JSON.stringify(counterNames);
        await AsyncStorage.setItem('counterNames', jsonString);
        console.log('Массив названий счетчиков успешно сохранен в Async Storage.');
    } catch (error) {
        console.error('Ошибка при сохранении массива названий счетчиков:', error);
    }
};

/**
 * Получает массив названий счетчиков из Async Storage.
 *
 * @returns {Promise<string[]|[]>} Промис, который разрешается массивом названий счетчиков или пустым массивом в случае ошибки.
 *
 * @example
 * // Пример использования:
 * const counterNames = await getCounterNamesFromAsyncStorage();
 * console.log('Полученные названия счетчиков:', counterNames);
 */
const getCounterNamesFromAsyncStorage = async (): Promise<string[] | []> => {
    try {
        const jsonString = await AsyncStorage.getItem('counterNames');
        const counterNames = JSON.parse(jsonString);
        console.log('Массив названий счетчиков успешно получен из Async Storage:', counterNames);
        return counterNames || []; // Возвращаем массив или пустой массив, если ничего не найдено
    } catch (error) {
        console.error('Ошибка при получении массива названий счетчиков:', error);
        return [];
    }
};

/**  Функция для сохранения текущей темы */
const saveSelectedThemeAsyncStore = async (theme: string) => {
    try {
        await AsyncStorage.setItem('selected_theme', theme);
    } catch (error) {
        console.error('Error saving theme:', error);
    }
};

/**  Функция для получения текущей темы */
const getSelectedThemeAsyncStore = async (): Promise<'light' | 'dark' | string> => {
    try {
        let theme = await AsyncStorage.getItem('selected_theme');
        let currentDeviceTheme = Appearance.getColorScheme();

        // Если запись отсутствует, создаем её 
        if (theme === null) {

            if (currentDeviceTheme === 'dark') {
                await AsyncStorage.setItem('selected_theme', 'dark');
                theme = 'dark';
            } else {
                await AsyncStorage.setItem('selected_theme', 'light');
                theme = 'light';
            }

        }
        return theme;
    } catch (error) {
        console.error('Error getting theme:', error);
        return 'dark';
    }
};

/** Функция добавления дополнительных опций стоимости у счетчиков: например, водоотведение у воды. Хранит массив объектов - название счетчика, доп стоимость 
 * @param {string} counterName - название счетчика
 * @param {string} additionalCost - дополнительная стоимость 
*/
const addAdditionalCostOptionAsyncStore = async (counterName: string, additionalCost: string) => {
    try {
        // Получаем текущий массив из AsyncStorage (если он существует)
        const existingOptions = await AsyncStorage.getItem('additionalCostOptions');
        const optionsArray = existingOptions ? JSON.parse(existingOptions) : [];

        // Проверяем, существует ли уже опция для данного счетчика
        const existingOptionIndex = optionsArray.findIndex((option: any) => option.counterName === counterName);

        if (existingOptionIndex !== -1) {
            // Если опция существует, обновляем её
            optionsArray[existingOptionIndex] = { counterName, additionalCost };
        } else {
            // Если опции нет, добавляем новую
            optionsArray.push({ counterName, additionalCost });
        }

        // Сохраняем обновленный массив в AsyncStorage
        await AsyncStorage.setItem('additionalCostOptions', JSON.stringify(optionsArray));

        console.log('Дополнительная опция стоимости успешно добавлена.');
    } catch (error) {
        console.error('Ошибка при добавлении дополнительной опции стоимости:', error);
    }
};

/** Функция добавления дополнительных опций стоимости у счетчиков: например, водоотведение у воды. Хранит массив объектов - название счетчика, доп стоимость */
const getAdditionalCostOptionAsyncStore = async (counterName: string) => {
    try {
        // Получаем текущий массив из AsyncStorage (если он существует)
        const existingOptions = await AsyncStorage.getItem('additionalCostOptions');
        const optionsArray = existingOptions ? JSON.parse(existingOptions) : [];
        let findedCostOptions = 0;

        // Проверяем, существует ли уже опция для данного счетчика
        const existingOptionIndex = optionsArray.findIndex((option: any) => option.counterName === counterName);

        if (existingOptionIndex !== -1) {
            // Если опция существует, обновляем её
            findedCostOptions = optionsArray[existingOptionIndex].additionalCost;
            return findedCostOptions;
        } else {
            return undefined;
        }

    } catch (error) {
        console.error('Ошибка при добавлении дополнительной опции стоимости:', error);
    }
};

export {
    saveLocaleToAsyncStorage, // Функция для сохранения значения "locale" в Async Storage
    getLocaleFromAsyncStorage, // Функция для получения значения "locale" из Async Storage
    savePermissionLocation, // Сохранить состояние на получение локации
    getPermissionLocation, // Получить состояние разрешения на получение локации
    saveCountersToAsyncStorage,
    getCounterNamesFromAsyncStorage,
    saveSelectedThemeAsyncStore,
    getSelectedThemeAsyncStore,
    addAdditionalCostOptionAsyncStore,
    getAdditionalCostOptionAsyncStore,
    savePushTokenToAsyncStorage, // Функция для сохранения  Push Token в AsyncStorage
    getPushTokenFromAsyncStorage, //  Функция для получения Push Token из AsyncStorage
    generateAndSaveDeviceId, // Генерировать уникальный deviceId и сохранить его в asyncStorage
    getDeviceId, // Получить deviceId из asyncStorage
};
