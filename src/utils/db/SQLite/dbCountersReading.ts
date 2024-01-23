import SQLite from 'react-native-sqlite-storage';
import { TypeCounterMeters } from '../../../screens/counters/types/types';
const dbInit = SQLite.openDatabase({ name: "countersReading.db", location: 'default' });

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
const openOrCreateDatabaseMeterCounterRecord = async (succeffullCallBack: (string: string) => void, errorCallBack: (string: string) => void): Promise<void> => {
    let db = dbInit;
    if (dbInit === undefined) {
        db = await SQLite.openDatabase({ name: "countersReading.db", location: 'default' });
    }
    // Проверяем, существует ли таблица "countersReading"
    await db.transaction(
        (tx: any) => {
            tx.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='countersReading';",
                [],
                (_, { rows }) => {
                    if (rows.length === 0) {
                        // Таблица "countersReading" не существует, создаем ее
                        tx.executeSql(
                            "CREATE TABLE IF NOT EXISTS countersReading (id INTEGER PRIMARY KEY AUTOINCREMENT, idCounter TEXT, data TEXT, date TEXT);",
                            [],
                            () => {
                                console.log(`Таблица "countersReading" создана в базе данных `);
                                succeffullCallBack(db);
                            },
                            (_, error: any) => {
                                console.error("Ошибка при создании таблицы:", error);
                                errorCallBack(error);
                            }
                        );
                    } else {
                        console.log(`Таблица "countersReading" уже существует в базе данных`);
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
 * Асинхронно создает запись в таблице "countersReading" базы данных SQLite.
 *
 * @param {Object} data - Объект с данными для создания записи в таблице.
 * @param {string} data.idCounter - Идентификатор счетчика.
 * @param {string} data.data - Значение счетчика.
 * @param {string} data.date - Дата записи.
 * @param {Function} callback - Функция обратного вызова, вызываемая после успешного создания записи.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции создания записи.
 * @throws {Error} Ошибка в случае проблем с созданием записи.
 *
 * @example
 * // Пример использования:
 * createMeterCounterRecord(
 *   {
 *     idCounter: '12345',
 *     data: '9876',
 *     date: '2023-01-15',
 *   },
 *   () => {
 *     console.log("Запись успешно создана в таблице 'countersReading'");
 *     // Дополнительные действия после создания записи
 *   }
 * );
 */
const createMeterCounterRecord = async (data: { idCounter: string; data: string; date: string }, callback: () => void): Promise<void> => {
    try {
        let db = dbInit;
        if (dbInit === undefined) {
            db = await SQLite.openDatabase({ name: "countersReading.db", location: 'default' });
        }
        SQLite.enablePromise(true);
        await db.transaction(
            (tx: any) => {
                tx.executeSql(
                    "INSERT INTO countersReading (idCounter, data, date) VALUES (?, ?, ?);",
                    [data.idCounter, data.data, data.date],
                    () => {
                        console.log(`Запись успешно создана в таблице 'countersReading'`);
                        callback();
                    },
                    (_, error: any) => {
                        console.error("Ошибка при создании записи в таблице 'countersReading':", error);
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
        throw new Error("Произошла ошибка при создании записи в таблице 'countersReading'");
    }
};

/**
 * Асинхронно ищет все записи в таблице 'countersReading' по указанному идентификатору счетчика.
 *
 * @param {string} idCounter - Идентификатор счетчика, для которого нужно найти записи.
 * @returns {Promise<Array<TypeCounterMeters>>} Промис, который разрешается массивом объектов записей или [], если записей не найдено.
 * @throws {Error} Ошибка в случае проблем с выполнением запроса.
 *
 * @example
 * // Пример использования:
 * try {
 *   const idCounter = '12345';
 *   const records = await findRecordsByIdCounter(idCounter);
 *   if (records) {
 *     console.log('Найдены следующие записи:', records);
 *   } else {
 *     console.log('Записей не найдено.');
 *   }
 * } catch (error) {
 *   console.error('Произошла ошибка при поиске записей:', error);
 * }
 */
async function findRecordsByIdCounter(idCounter: string): Promise<Array<TypeCounterMeters>> {
    try {
        let db = dbInit;
        if (dbInit === undefined) {
            db = await SQLite.openDatabase({ name: "countersReading.db", location: 'default' });
        }

        SQLite.enablePromise(true);

        return new Promise((resolve, reject) => {
            db.transaction(
                (tx: any) => {
                    tx.executeSql(
                        "SELECT * FROM countersReading WHERE idCounter = ?;",
                        [idCounter],
                        (_, result: any) => {
                            if (result.rows.length > 0) {
                                const records = result.rows.raw(); // Получаем данные в виде массива объектов
                                resolve(records);
                            } else {
                                resolve([]);
                            }
                        },
                        (_, error: any) => {
                            reject(new Error(`Ошибка при поиске записей в таблице 'countersReading': ${error}`));
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
        throw new Error(`Произошла ошибка при поиске записей в таблице 'countersReading': ${error}`);
    }
}


/**
 * Асинхронно удаляет запись из таблицы "countersReading" базы данных SQLite по идентификатору.
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
 *     console.log("Запись успешно удалена из таблицы 'countersReading'");
 *     // Дополнительные действия после удаления записи
 *   }
 * );
 */
const deleteMeterCounterRecordById = async (id: string, callback: () => void): Promise<void> => {
    try {
        let db = dbInit;
        if (dbInit === undefined) {
            db = await SQLite.openDatabase({ name: "countersReading.db", location: 'default' });
        }
        SQLite.enablePromise(true);
        await db.transaction(
            (tx: any) => {
                tx.executeSql(
                    "DELETE FROM countersReading WHERE id = ?;",
                    [id],
                    () => {
                        console.log(`Запись успешно удалена из таблицы 'countersReading'`);
                        callback();
                    },
                    (_, error: any) => {
                        console.error("Ошибка при удалении записи из таблицы 'countersReading':", error);
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
        throw new Error("Произошла ошибка при удалении записи из таблицы 'countersReading'");
    }
};



export {
    openOrCreateDatabaseMeterCounterRecord,
    createMeterCounterRecord,
    findRecordsByIdCounter,
    deleteMeterCounterRecordById
};