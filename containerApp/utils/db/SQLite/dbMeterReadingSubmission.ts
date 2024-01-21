import SQLite from 'react-native-sqlite-storage';
import { TypeCounterMeters } from '../../../screens/counters/types/types';

const dbInit = SQLite.openDatabase({ name: "meterReadingSubmission.db", location: 'default' });

/**
 * Асинхронно открывает или создает базу данных SQLite для работы с данными счетчиков.
 *
 * @param {Function} succeffullCallBack - Функция обратного вызова, вызываемая при успешном открытии или создании базы данных. Принимает объект базы данных в качестве аргумента.
 * @param {Function} errorCallBack - Функция обратного вызова, вызываемая в случае ошибки при открытии или создании базы данных. Принимает объект ошибки в качестве аргумента.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции открытия или создания базы данных.
 * @throws {Error} Ошибка в случае проблем с открытием или созданием базы данных.
 *
 * @example
 * // Пример использования:
 * openOrCreateDatabase(
 *   (db) => {
 *     console.log("База данных успешно открыта или создана", db);
 *     // Дополнительные действия с открытой базой данных
 *   },
 *   (error) => {
 *     console.error("Ошибка при открытии или создании базы данных:", error);
 *     // Дополнительные действия в случае ошибки
 *   }
 * );
 */
const openOrCreateDatabaseMeterCounterRecord = (succeffullCallBack: (string: string) => void, errorCallBack: (string: string) => void) => {
    // Проверяем, существует ли таблица "meterReadingSubmission"
    let db = dbInit;
    if (dbInit === undefined) {
        db = SQLite.openDatabase({ name: "meterReadingSubmission.db", location: 'default' });
    }
    db.transaction(
        (tx: any) => {
            tx.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='meterReadingSubmission';",
                [],
                (_: any, { rows }) => {
                    if (rows.length === 0) {
                        // Таблица "meterReadingSubmission" не существует, создаем ее
                        tx.executeSql(
                            "CREATE TABLE IF NOT EXISTS meterReadingSubmission (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, meterReadings TEXT, idAddress TEXT);",
                            [],
                            () => {
                                console.log(`Таблица "meterReadingSubmission" создана в базе данных `);
                                succeffullCallBack(db);
                            },
                            (_, error: any) => {
                                console.error("Ошибка при создании таблицы:", error);
                                errorCallBack(error);
                            }
                        );
                    } else {
                        console.log(`Таблица "meterReadingSubmission" уже существует в базе данных`);
                        succeffullCallBack(db);
                    }
                },
                (_, error: any) => {
                    console.error("Ошибка при проверке таблицы:", error);
                    errorCallBack(error);
                }
            );
        },
        (error: any) => {
            console.error("Ошибка при открытии базы данных:", error);
            errorCallBack(error);
        }
    );
};

/**
 * Асинхронно создает запись в таблице "meterReadingSubmission" базы данных SQLite.
 *
 * @param {Object} data - Объект с данными для создания записи в таблице.
 * @param {string} data.date - Дата записи.
 * @param {string} data.meterReadings - Массив в виде значений название счетчика и объем потребления.
 * @param {string} data.idAddress - Массив в виде значений название счетчика и объем потребления.
 * @param {Function} callback - Функция обратного вызова, вызываемая после успешного создания записи.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции создания записи.
 * @throws {Error} Ошибка в случае проблем с созданием записи.
 */
const createMeterCounterRecord = async (data: { date: string, meterReadings: string, idAddress: string }, callback: () => void): Promise<void> => {
    try {
        let db = dbInit;
        if (dbInit === undefined) {
            db = await SQLite.openDatabase({ name: "meterReadingSubmission.db", location: 'default' });
        }
        SQLite.enablePromise(true);
        await db.transaction(
            (tx: any) => {
                tx.executeSql(
                    "INSERT INTO meterReadingSubmission (date, meterReadings, idAddress) VALUES (?, ?, ?);",
                    [data.date, data.meterReadings, data.idAddress],
                    () => {
                        console.log(`Запись успешно создана в таблице 'meterReadingSubmission'`);
                        callback();
                    },
                    (_, error: any) => {
                        console.error("Ошибка при создании записи в таблице 'meterReadingSubmission':", error);
                    }
                );
            },
            null,
            null,
            (error: any) => {
                console.error("Ошибка при выполнении SQL-запроса:", error);
            }
        );
    } catch (error) {
        console.log(error);
        throw new Error("Произошла ошибка при создании записи в таблице 'meterReadingSubmission'");
    }
};

/**
 * Асинхронно ищет все записи в таблице 'meterReadingSubmission' по указанному идентификатору счетчика.
 *
 * @param {string} idAddress - Идентификатор счетчика, для которого нужно найти записи.
 * @returns {Promise<Array<TypeCounterMeters>>} Промис, который разрешается массивом объектов записей или [], если записей не найдено.
 * @throws {Error} Ошибка в случае проблем с выполнением запроса.
 *
 * @example
 */
async function findRecordsByIdCounter(idAddress: string): Promise<Array<TypeCounterMeters>> {
    try {
        let db = dbInit;
        if (dbInit === undefined) {
            db = await SQLite.openDatabase({ name: "meterReadingSubmission.db", location: 'default' });
        }
        SQLite.enablePromise(true);
        return new Promise((resolve, reject) => {
            db.transaction(
                (tx: any) => {
                    tx.executeSql(
                        "SELECT * FROM meterReadingSubmission WHERE idAddress = ?;",
                        [idAddress],
                        (_: any, result: any) => {
                            if (result.rows.length > 0) {
                                const records = result.rows.raw(); // Получаем данные в виде массива объектов
                                resolve(records);
                            } else {
                                resolve([]);
                            }
                        },
                        (_, error: any) => {
                            reject(new Error(`Ошибка при поиске записей в таблице 'meterReadingSubmission': ${error}`));
                        }
                    );
                },
                (error: any) => {
                    reject(new Error(`Ошибка при выполнении SQL-запроса: ${error}`));
                },
                null
            );
        });
    } catch (error) {
        throw new Error(`Произошла ошибка при поиске записей в таблице 'meterReadingSubmission': ${error}`);
    }
}


/**
 * Асинхронно удаляет запись из таблицы "meterReadingSubmission" базы данных SQLite по идентификатору.
 *
 * @param {number} id - Идентификатор записи, которую нужно удалить.
 * @param {Function} callback - Функция обратного вызова, вызываемая после успешного удаления записи.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции удаления записи.
 * @throws {Error} Ошибка в случае проблем с удалением записи.
 *
 * @example
 * // Пример использования:
 * deleteMeterCounterRecordById(123,
 *   () => {
 *     console.log("Запись успешно удалена из таблицы 'meterReadingSubmission'");
 *     // Дополнительные действия после удаления записи
 *   }
 * );
 */
const deleteMeterCounterRecordById = async (id: string, callback: () => void): Promise<void> => {
    try {
        let db = dbInit;
        if (dbInit === undefined) {
            db = await SQLite.openDatabase({ name: "meterReadingSubmission.db", location: 'default' });
        }
        SQLite.enablePromise(true);
        await db.transaction(
            (tx: any) => {
                tx.executeSql(
                    "DELETE FROM meterReadingSubmission WHERE id = ?;",
                    [id],
                    () => {
                        console.log(`Запись успешно удалена из таблицы 'meterReadingSubmission'`);
                        callback();
                    },
                    (_, error: any) => {
                        console.error("Ошибка при удалении записи из таблицы 'meterReadingSubmission':", error);
                    }
                );
            },
            null,
            null,
            (error: any) => {
                console.error("Ошибка при выполнении SQL-запроса:", error);
            }
        );
    } catch (error) {
        console.log(error);
        throw new Error("Произошла ошибка при удалении записи из таблицы 'meterReadingSubmission'");
    }
};



export {
    openOrCreateDatabaseMeterCounterRecord,
    createMeterCounterRecord,
    findRecordsByIdCounter,
    deleteMeterCounterRecordById
};