import SQLite from 'react-native-sqlite-storage';
import { TypeCounterInfo } from '../../../screens/counters/types/types';

/**
 * Асинхронно открывает или создает базу данных SQLite для приложения. 
 * Если база данных уже существует, проверяет наличие таблицы "Counters".
 * Если таблица отсутствует, создает ее с необходимой структурой. (name - название счетчика, address - id адреса где он установлен, counterNumber - номер счетчика, dateOfCounterVerification - дата поверки, dateOfCounterVerificationNext)
 *
 * @param {Function} succeffullCallBack - Функция обратного вызова, вызываемая при успешном открытии или создании базы данных. Принимает базу данных в качестве аргумента.
 * @param {Function} errorCallBack - Функция обратного вызова, вызываемая в случае ошибки при открытии или создании базы данных. Принимает ошибку в качестве аргумента.
 * @returns {Promise<void>} Промис, который разрешается после завершения операций открытия или создания базы данных.
 * @throws {Error} Ошибка в случае проблем с открытием или созданием базы данных.
 *
 * @example
 * // Пример использования:
 * openOrCreateDatabase(
 *   (db) => {
 *     console.log("База данных успешно открыта или создана", db);
 *     // Дополнительные действия при успешном открытии или создании базы данных
 *   },
 *   (error) => {
 *     console.error("Произошла ошибка при открытии или создании базы данных", error);
 *     // Дополнительные действия при ошибке
 *   }
 * );
 */
const openOrCreateDatabase = async (succeffullCallBack: (string: string) => void, errorCallBack: (string: string) => void): Promise<void> => {
    const db = await SQLite.openDatabase({ name: "counters.db", location: 'default' });
    // Проверяем, существует ли таблица "counters"
    await db.transaction(
        (tx: any) => {
            tx.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='counters';",
                [],
                (_, { rows }) => {
                    if (rows.length === 0) {
                        // Таблица "counters" не существует, создаем ее
                        tx.executeSql(
                            "CREATE TABLE IF NOT EXISTS counters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, counterNumber TEXT, dateOfCounterVerification TEXT, dateOfCounterVerificationNext TEXT);",
                            [],
                            () => {
                                console.log(`Таблица "counters" создана в базе данных `);
                                succeffullCallBack(db);
                            },
                            (_, error: any) => {
                                console.error("Ошибка при создании таблицы:", error);
                                errorCallBack(error);
                            }
                        );
                    } else {
                        console.log(`Таблица "counters" уже существует в базе данных`);
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
 * Асинхронно получает данные из базы данных SQLite по счетчикам.
 *
 * @param {Function} handleData - Функция обратного вызова, вызываемая после успешного получения данных из базы данных. Принимает данные в виде массива объектов в качестве аргумента.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции получения данных из базы данных.
 * @throws {Error} Ошибка в случае проблем с получением данных из базы данных.
 *
 * @example
 * // Пример использования:
 * getDataFromDatabase(
 *   (data) => {
 *     console.log("Данные из базы данных успешно получены", data);
 *     // Дополнительные действия с полученными данными
 *   }
 * );
 */
async function getDataFromDatabase(handleData: (string: string | []) => void): Promise<void> {
    try {
        const db = await SQLite.openDatabase({ name: "counters.db", location: 'default' });
        SQLite.enablePromise(true);
        await db.transaction(
            (tx: any) => {
                tx.executeSql(
                    (_, result: any) => {
                        if (result.rows.length > 0) {
                            const data = result.rows.raw(); // Получаем данные в виде массива объектов
                            console.log("Данные из базы данных о счетчиках получены");
                            handleData(data);
                        } else {
                            console.log("База данных о счетчиках пуста.");
                            handleData([]);
                        }
                    },
                    (_, error: any) => {
                        console.error("Ошибка при получении данных из базы данных:", error);
                    }
                );
            },
            null,
            null,
            (error: any) => {
                console.error("Ошибка при выполнении SQL-запроса:", error);
            }
        );
    }
    catch (error) {
        console.log(error);
    }
}

/**
 * Асинхронно получает данные счетчиков из базы данных SQLite по их названию.
 *
 * @param {string} counterName - Название счетчика, данные которого нужно получить.
 * @returns {Promise<TypeCounterInfo>} Промис, который разрешается после успешного выполнения операции получения данных из базы данных.
 * @throws {Error} Ошибка в случае проблем с получением данных из базы данных.
 *
 * @example
 * // Пример использования:
 * getDataByCounterName(
 *   'Название_счетчика',
 *   (data) => {
 *     console.log("Данные счетчика успешно получены", data);
 *     // Дополнительные действия с полученными данными
 *   }
 * );
 */
async function getDataByCounterName(counterName: string): Promise<TypeCounterInfo | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await SQLite.openDatabase({ name: "counters.db", location: 'default' });
            SQLite.enablePromise(true);

            await db.transaction(
                (tx: any) => {
                    tx.executeSql(
                        "SELECT * FROM counters WHERE name = ?;",
                        [counterName],
                        (_, result: any) => {
                            if (result.rows.length > 0) {
                                const data = result.rows.raw()[0]; // Получаем данные в виде объекта
                                console.log(result.rows.raw())
                                console.log(`Данные счетчика с именем "${counterName}" успешно получен`);
                                resolve(data);
                            } else {
                                console.log(`Счетчик с именем "${counterName}" не найден в базе данных.`);
                                resolve(null);
                            }
                        },
                        (_, error: any) => {
                            reject(error);
                        }
                    );
                },
                null,
                null,
                (error: any) => {
                    reject(error);
                }
            );
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Асинхронно получает данные счетчиков из базы данных SQLite по адресу и названию.
 *
 * @param {string} counterName - Название счетчика, данные которого нужно получить.
 * @param {string} addressId - айди адреса, на котором нужно искать счетчик с таким названием.
 * @returns {Promise<TypeCounterInfo>} Промис, который разрешается после успешного выполнения операции получения данных из базы данных.
 * @throws {Error} Ошибка в случае проблем с получением данных из базы данных.
 *
 * @example
 * // Пример использования:
 * getDataByCounterName(
 *   'Название_счетчика',
 *   (data) => {
 *     console.log("Данные счетчика успешно получены", data);
 *     // Дополнительные действия с полученными данными
 *   }
 * );
 */
async function getDataByCounterNameAndAddressId(addressId: string, counterName: string): Promise<TypeCounterInfo | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await SQLite.openDatabase({ name: "counters.db", location: 'default' });
            SQLite.enablePromise(true);

            await db.transaction(
                (tx: any) => {
                    tx.executeSql(
                        "SELECT * FROM counters WHERE name = ? AND address = ?;",
                        [counterName, addressId],
                        (_, result: any) => {
                            if (result.rows.length > 0) {
                                const data = result.rows.raw()[0]; // Получаем данные в виде объекта
                                console.log(result.rows.raw())
                                console.log(`Данные счетчика с именем "${addressId}" успешно получен`);
                                resolve(data);
                            } else {
                                console.log(`Счетчик с именем "${addressId}" не найден в базе данных.`);
                                resolve(null);
                            }
                        },
                        (_, error: any) => {
                            reject(error);
                        }
                    );
                },
                null,
                null,
                (error: any) => {
                    reject(error);
                }
            );
        } catch (error) {
            reject(error);
        }
    });
}



/**
 * Асинхронно создает или вставляет данные счетчика в базу данных SQLite.
 *
 * @param {Object} data - Объект данных счетчика, который нужно вставить в базу данных.
 * @param {string} data.name - Имя счетчика.
 * @param {string} data.address - id Адреса счетчика.
 * @param {string} data.counterNumber - Номер счетчика.
 * @param {string} data.dateOfCounterVerification - Дата последней поверки счетчика.
 * @param {string} data.dateOfCounterVerificationNext - Плановая дата следующей поверки счетчика.
 * @param {Function} callback - Функция обратного вызова, вызываемая после успешного создания или вставки данных в базу данных.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции создания или вставки данных в базу данных.
 * @throws {Error} Ошибка в случае проблем с созданием или вставкой данных в базу данных.
 *
 * @example
 * // Пример использования:
 * createOrInsertData(
 *   {
 *     name: "Счетчик воды",
 *     address: "12345",
 *     counterNumber: "123456",
 *     dateOfCounterVerification: "2023-01-01",
 *     dateOfCounterVerificationNext: "2024-01-01"
 *   },
 *   () => {
 *     console.log("Данные успешно созданы или вставлены в базу данных");
 *     // Дополнительные действия после успешного создания или вставки данных
 *   }
 * );
 */
async function createOrInsertData(data: TypeCounterInfo): Promise<TypeCounterInfo> {
    return new Promise<TypeCounterInfo>(async (resolve, reject) => {
        try {
            const db = await SQLite.openDatabase({ name: "counters.db", location: 'default' });

            // Извлекаем значения
            const { name, address, counterNumber, dateOfCounterVerification, dateOfCounterVerificationNext } = data;

            // Сохраняем значение "name" в базу данных "counters"
            await db.transaction(
                (tx: any) => {
                    tx.executeSql(
                        "INSERT INTO counters (name, address, counterNumber, dateOfCounterVerification, dateOfCounterVerificationNext) VALUES (?, ?, ?, ?, ?)",
                        [name, address, counterNumber, dateOfCounterVerification, dateOfCounterVerificationNext],
                        (_, result: any) => {
                            console.log(`Информация о счетчике успешно сохранена в базу данных.`);
                            resolve(data);  // Возвращаем созданный объект после успешной вставки
                        },
                        (_, error: any) => {
                            console.error(`Ошибка при сохранении информации о счетчике:`, error);
                            reject(error);
                        }
                    );
                },
                null,
                null,
                (error: any) => {
                    console.error("Ошибка при сохранении данных:", error);
                    reject(error);
                }
            );
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

/**
 * Асинхронно удаляет документ из базы данных SQLite по указанному идентификатору.
 *
 * @param {number} id - Идентификатор документа, который нужно удалить из базы данных.
 * @param {Function} callback - Функция обратного вызова, вызываемая после успешного удаления документа из базы данных.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции удаления документа из базы данных.
 * @throws {Error} Ошибка в случае проблем с удалением документа из базы данных.
 *
 * @example
 * // Пример использования:
 * deleteDocumentById(
 *   123,
 *   () => {
 *     console.log("Документ успешно удален из базы данных");
 *     // Дополнительные действия после успешного удаления документа
 *   }
 * );
 */
async function deleteDocumentById(id: number, callback: Function): Promise<void> {
    const db = await SQLite.openDatabase({ name: "counters.db", location: 'default' });
    await db.transaction(
        (tx) => {
            tx.executeSql(
                "DELETE FROM counters WHERE id = ?",
                [id],
                (_, result) => {
                    console.log(`Document with ID ${id} successfully deleted from the counters table.`);
                    callback();
                },
                (_, error) => {
                    console.error(`Error deleting document with ID ${id} from the counters table:`, error);
                }
            );
        },
        null,
        null,
    );
}

/**
 * Асинхронно обновляет документ в базе данных SQLite по указанному идентификатору.
 *
 * @param {number} id - Идентификатор документа, который нужно обновить в базе данных.
 * @param {Object} data - Объект новых данных для обновления документа в базе данных.
 * @param {string} data.name - Новое имя счетчика.
 * @param {string} data.address - Новый id адреса счетчика.
 * @param {string} data.counterNumber - Новый номер счетчика.
 * @param {string} data.dateOfCounterVerification - Новая дата последней поверки счетчика.
 * @param {string} data.dateOfCounterVerificationNext - Новая плановая дата следующей поверки счетчика.
 * @param {Function} callback - Функция обратного вызова, вызываемая после успешного обновления документа в базе данных.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции обновления документа в базе данных.
 * @throws {Error} Ошибка в случае проблем с обновлением документа в базе данных.
 *
 * @example
 * // Пример использования:
 * updateDocumentById(
 *   123,
 *   {
 *     name: "Новое имя",
 *     address: "Новый айди адреса",
 *     counterNumber: "789012",
 *     dateOfCounterVerification: "2024-01-01",
 *     dateOfCounterVerificationNext: "2025-01-01"
 *   },
 *   () => {
 *     console.log("Документ успешно обновлен в базе данных");
 *     // Дополнительные действия после успешного обновления документа
 *   }
 * );
 */
async function updateDocumentById(id: number, data: { name: string; address: string; counterNumber: string; dateOfCounterVerification: string; dateOfCounterVerificationNext: string; }, callback: Function): Promise<void> {
    try {
        const db = await SQLite.openDatabase({ name: "counters.db", location: 'default' });
        // Извлекаем новые данные из объекта newData
        // Извлекаем значения
        const name = data.name;
        const address = data.address;
        const counterNumber = data.counterNumber;
        const dateOfCounterVerification = data.dateOfCounterVerification;
        let dateOfCounterVerificationNext = data.dateOfCounterVerificationNext;

        await db.transaction(
            (tx) => {
                tx.executeSql(
                    "UPDATE counters SET name = ?, address = ?, counterNumber = ?, dateOfCounterVerification = ?, dateOfCounterVerificationNext = ? WHERE id = ?",
                    [type, date, cost, volume, vin, id],
                    (_, result) => {
                        console.log(`Документ с ID ${id} успешно обновлен в таблице counters.`);
                        callback();
                    },
                    (_, error) => {
                        console.error(`Ошибка при обновлении документа с ID ${id} в таблице counters:`, error);
                    }
                );
            },
            null,
            null,
        );
    }
    catch (error) {
        console.log(error);
    }
}

export {
    getDataFromDatabase,
    getDataByCounterName,
    getDataByCounterNameAndAddressId,
    openOrCreateDatabase,
    createOrInsertData,
    updateDocumentById,
    deleteDocumentById,
}
