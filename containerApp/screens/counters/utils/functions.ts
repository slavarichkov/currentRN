import { getDataByCounterName, createOrInsertData, getDataByCounterNameAndAddressId } from "../../../utils/db/SQLite/dbCounters";
import { arrayFirstObgCounterData } from './const';
import { TypeCounterInfo, TypeCounterMeters } from "../types/types";
import { findRecordsByIdCounter } from "../../../utils/db/SQLite/dbCountersReading";

/**
 * Асинхронно получает данные счетчиков из базы данных SQLite по имени счетчика.
 *
 * @param {string} counterName - Имя счетчика, данные которого нужно получить.
 * @returns {Promise<TypeCounterInfo >} Промис, который разрешается данными счетчика или null, если счетчик не найден и создает его с первой записью.
 * @throws {Error} Ошибка в случае проблем с получением данных из базы данных.
 */
async function getDataCounters(addressId: string, counterName: string): Promise<TypeCounterInfo | undefined> {
    try {
        const obj = await getDataByCounterNameAndAddressId(addressId.toString(), counterName);
        if (obj) {
            return obj;
        } else {
            let savedObj = arrayFirstObgCounterData.find((counterObj) => counterObj.name === counterName);
            savedObj.address = addressId.toString();
            if (savedObj) {
                const objCurrent = await saveDataCounters(savedObj);
                return objCurrent;
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

/**
 * Асинхронно сохраняет данные счетчика в базу данных SQLite.
 *
 * @param {TypeCounterInfo} data - Объект с данными счетчика для сохранения.
 * @returns {Promise<TypeCounterInfo>} Промис, который разрешается созданным объектом
 * @throws {Error} Ошибка в случае проблем с сохранением данных в базе данных.
 */
async function saveDataCounters(data: TypeCounterInfo) {
    const savedObj = await createOrInsertData(data);
    return savedObj;
}

/**
 * Получить текущую дату в виде строки в формате "день месяц год".
 *
 * @returns {string} Текущая дата в виде строки.
 *
 * @example
 * // Пример использования:
 * const currentDate = getCurrentDateByString();
 * console.log(currentDate); // Например, "15 1 2023"
 */
function getCurrentDateByString() {
    const currentDate = new Date();
    const formattedDate = currentDate.toString();
    return formattedDate;
}

/**
 * Находит объект с самой ближайшей датой к текущей дате в массиве объектов.
 *
 * @param {Array<TypeCounterMeters>} dataArray - Массив объектов с датами в виде строк.
 * @returns {Object|null} - Объект с самой ближайшей датой или null, если массив пуст.
 *
 * @example
 * // Пример использования:
 * const data = [
 *   { date: "2022-01-10" },
 *   { date: "2022-01-15" },
 *   { date: "2022-01-20" },
 * ];
 * const nearestDateObject = findNearestDateObject(data);
 * console.log(nearestDateObject);
 */
function findNearestDateObject(dataArray: Array<TypeCounterMeters>) {
    const currentDate = new Date();

    // Преобразуем текущую дату в миллисекунды
    const currentTimestamp = currentDate.getTime();

    // Сортируем массив объектов по разнице между датой объекта и текущей датой
    const sortedArray = dataArray.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        const differenceA = Math.abs(currentTimestamp - dateA);
        const differenceB = Math.abs(currentTimestamp - dateB);

        return differenceA - differenceB;
    });

    // Возвращаем первый элемент отсортированного массива (с наименьшей разницей)
    return sortedArray[0] || null;
}

/**
* Асинхронно получает данные о счетчике и ближайшие показания счетчика по его названию.
*
* @async
* @function
* @param {string} counterName - Название счетчика.
* @returns {Promise<{ counterInfo: TypeCounterInfo | undefined, nearestReading: string | undefined }>} Промис с объектом, содержащим информацию о счетчике и ближайшие показания.
*
* @throws {Error} Ошибка в случае проблем с получением данных.
*
* @example
* // Пример использования:
* try {
*   const { counterInfo, nearestReading } = await getDataCounter('Горячая вода');
*   console.log("Данные о счетчике и показания успешно получены:", counterInfo, nearestReading);
* } catch (error) {
*   console.error("Ошибка при получении данных о счетчике и показаниях:", error);
* }
*/
async function getDataAndNearestReadingCounter(addressId: string, counterName: string): Promise<{ counterInfo: TypeCounterInfo | undefined, nearestReading: TypeCounterMeters | undefined }> {
    try {
        // Получение данных о счетчике
        const counterInfo = await getDataCounters(addressId, counterName);

        // Идентификация строкового идентификатора счетчика
        const counterId = counterInfo?.id?.toString();

        // Получение ближайших показаний счетчика
        if (counterId) {
            const counterReadings = await findRecordsByIdCounter(counterId);
            if (counterReadings.length > 0) {
                const nearestObjDateReading = findNearestDateObject(counterReadings);
                const nearestReading = nearestObjDateReading;

                return { counterInfo, nearestReading };
            }
        }

        return { counterInfo, nearestReading: undefined };
    } catch (error) {
        console.error(`Произошла ошибка при получении данных о счетчике ${counterName} и показаниях:`, error);
        throw new Error(`Ошибка при получении данных о счетчике ${counterName} и показаниях`);
    }
}





export { getDataCounters, saveDataCounters, getCurrentDateByString, findNearestDateObject, getDataAndNearestReadingCounter }