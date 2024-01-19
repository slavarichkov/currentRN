import AsyncStorage from '@react-native-async-storage/async-storage';

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

export {
    saveLocaleToAsyncStorage, // Функция для сохранения значения "locale" в Async Storage
    getLocaleFromAsyncStorage, // Функция для получения значения "locale" из Async Storage
    savePermissionLocation, // Сохранить состояние на получение локации
    getPermissionLocation, // Получить состояние разрешения на получение локации
    saveCountersToAsyncStorage,
    getCounterNamesFromAsyncStorage,
};
