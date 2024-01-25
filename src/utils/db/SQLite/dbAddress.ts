import SQLite from 'react-native-sqlite-storage';
import { TypeAddress, TypeAddressData } from '../../types/addressTypes';

const dbInit = SQLite.openDatabase({ name: "addresses.db", location: 'default' });

/**
 * Асинхронно открывает или создает базу данных SQLite для хранения адресов.
 *
 * @param {Function} succeffullCallBack - Функция обратного вызова, вызываемая при успешном открытии или создании базы данных. Принимает объект базы данных в качестве параметра.
 * @param {Function} errorCallBack - Функция обратного вызова, вызываемая в случае ошибки при открытии или создании базы данных. Принимает текстовое описание ошибки в качестве параметра.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции открытия или создания базы данных.
 *
 * @example
 * // Пример использования:
 * openOrCreateDatabase(
 *   (db) => {
 *     console.log("База данных успешно открыта/создана:", db);
 *     // Дополнительные действия после открытия/создания базы данных
 *   },
 *   (error) => {
 *     console.error("Ошибка при открытии/создании базы данных:", error);
 *     // Дополнительные действия в случае ошибки
 *   }
 * );
 */
const openOrCreateDatabase = async (succeffullCallBack: (string: string) => void, errorCallBack: (string: string) => void): Promise<void> => {
    // const db = await SQLite.openDatabase({ name: "addresses.db", location: 'default' });
    // Проверяем, существует ли таблица "addresses"
    let db = dbInit;
    if (dbInit === undefined || db.transaction === undefined) {
        db = await SQLite.openDatabase({ name: "addresses.db", location: 'default' });
    }
    await db.transaction(
        (tx: any) => {
            tx.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='addresses';",
                [],
                (_, { rows }) => {
                    if (rows.length === 0) {
                        // Таблица "addresses" не существует, создаем ее
                        tx.executeSql(
                            "CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, arrayCountersName TEXT, city TEXT, street TEXT, building TEXT, apartment TEXT, email TEXT, active TEXT);",
                            [],
                            () => {
                                console.log(`Таблица "addresses" создана в базе данных `);
                                succeffullCallBack(db);
                            },
                        );
                    } else {
                        console.log(`Таблица "addresses" уже существует в базе данных`);
                        succeffullCallBack(db);
                    }
                },
            );
        },

    );
};
// const openOrCreateDatabase = (): Promise<SQLite.SQLiteDatabase> => {
//     return new Promise((resolve, reject) => {
//         SQLite.openDatabase({ name: "addresses.db", location: 'default' },
//             (db: SQLite.SQLiteDatabase) => {
//                 // Проверяем, существует ли таблица "addresses"
//                 db.transaction(
//                     (tx: any) => {
//                         tx.executeSql(
//                             "SELECT name FROM sqlite_master WHERE type='table' AND name='addresses';",
//                             [],
//                             (_, { rows }) => {
//                                 if (rows.length === 0) {
//                                     // Таблица "addresses" не существует, создаем ее
//                                     tx.executeSql(
//                                         "CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, city TEXT, street TEXT, building TEXT, apartment TEXT, email TEXT, active TEXT);",
//                                         [],
//                                         () => {
//                                             console.log(`Таблица "addresses" создана в базе данных `);
//                                             resolve(`Таблица "addresses" создана в базе данных`);
//                                         },
//                                     );
//                                 } else {
//                                     console.log(`Таблица "addresses" уже существует в базе данных`);
//                                     resolve(`Таблица "addresses" уже существует в базе данных`);
//                                 }
//                             },
//                         );
//                     },
//                     (error: any) => {
//                         console.error("Ошибка при открытии/создании базы данных:", error);
//                         reject(error);
//                     },
//                 );
//             },
//             (error: any) => {
//                 console.error("Ошибка при открытии/создании базы данных:", error);
//                 reject(error);
//             },
//         );
//     });
// };

/**
 * Асинхронно создает новый адрес и возвращает промис с новым созданным адресом в виде объекта.
 *
 * @param {Object} addressData - Объект с данными для создания нового адреса.
 * @param {string} addressData.name - Название адреса ( например, мой дом). arrayCountersName
 * @param {string} addressData.arrayCountersName - Список счетчиков для отображения на адресе
 * @param {string} addressData.city - Город.
 * @param {string} addressData.street - Улица.
 * @param {string} addressData.building - Номер здания.
 * @param {string} addressData.apartment - Номер квартиры.
 * @param {string} addressData.active - Активный или нет адрес.
 * @returns {Promise<Object>} Промис, который разрешается после успешного создания адреса. Возвращает объект с данными нового адреса.
 *
 * @example
 * // Пример использования:
 * createNewAddress({
 *   city: "City",
 *   street: "Street",
 *   building: "Building 123",
 *   apartment: "Apt 456"
 * })
 *   .then((newAddress) => {
 *     console.log("Новый адрес создан:", newAddress);
 *     // Дополнительные действия после создания адреса
 *   })
 *   .catch((error) => {
 *     console.error("Ошибка при создании нового адреса:", error);
 *     // Дополнительные действия в случае ошибки
 *   });
 */
const createNewAddress = async (addressData: TypeAddress): Promise<TypeAddressData> => {
    return new Promise(async (resolve, reject) => {
        try {
            let db = dbInit;
            if (dbInit === undefined || db.transaction === undefined) {
                db = await SQLite.openDatabase({ name: "addresses.db", location: 'default' });
            }
            SQLite.enablePromise(true);

            await db.transaction(
                (tx: any) => {
                    tx.executeSql(
                        "INSERT INTO addresses (name, arrayCountersName, city, street, building, apartment, email, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                        [addressData.name, addressData.arrayCountersName, addressData.city, addressData.street, addressData.building, addressData.apartment, addressData.email, addressData.active],
                        (_, result: any) => {
                            const newAddressId = result.insertId;
                            const newAddress: TypeAddressData = { ...addressData, id: newAddressId };
                            console.log(`Новый адрес успешно создан:`, newAddress);
                            resolve(newAddress);
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
            console.log(error)
            reject(error);
        }
    });
};

/**
 * Асинхронно обновляет адрес по идентификатору и возвращает промис с обновленными данными адреса.
 *
 * @param {number} addressId - Идентификатор адреса, который нужно обновить.
 * @param {Object} updatedAddressData - Объект с обновленными данными для адреса.
 * @param {string} addressData.name - Название адреса
 * @param {string} addressData.arrayCountersName - Список счетчиков для отображения на адресе
 * @param {string} updatedAddressData.city - Новое значение города.
 * @param {string} updatedAddressData.street - Новое значение улицы.
 * @param {string} updatedAddressData.building - Новое значение номера здания.
 * @param {string} updatedAddressData.apartment - Новое значение номера квартиры.
 * @param {string} addressData.active - Активный или нет адрес.
 * @returns {Promise<Object>} Промис, который разрешается после успешного обновления адреса. Возвращает объект с обновленными данными адреса.
 *
 * @example
 * // Пример использования:
 * updateAddressById(1, {
 *   city: "New City",
 *   street: "New Street",
 *   building: "New Building 123",
 *   apartment: "New Apt 456"
 * })
 *   .then((updatedAddress) => {
 *     console.log("Адрес успешно обновлен:", updatedAddress);
 *     // Дополнительные действия после обновления адреса
 *   })
 *   .catch((error) => {
 *     console.error("Ошибка при обновлении адреса:", error);
 *     // Дополнительные действия в случае ошибки
 *   });
 */
// async function updateAddressById(updatedAddressData: TypeAddressData, callback: () => void) {
//     try {
//         const db = await SQLite.openDatabase({ name: "addresses.db", location: 'default' });
//         SQLite.enablePromise(true);
//         // Извлекаем новые данные из объекта newData
//         const { name, arrayCountersName, city, street, building, apartment, active, id } = updatedAddressData;

//         const result = await db.transaction(
//             (tx: any) => {
//                 tx.executeSql(
//                     "UPDATE addresses SET name = ?, arrayCountersName = ?, city = ?, street = ?, building = ?, apartment = ?, email = ?, active = ? WHERE id = ?",
//                     [name, arrayCountersName, city, street, building, apartment, active, id],
//                     (_: any, result: any) => {
//                         console.log(`Документ с ID ${id} успешно обновлен в таблице.`);
//                         callback();
//                     },
//                     (_: any, error: any) => {
//                         console.error(`Ошибка при обновлении документа с ID ${id} в таблице :`, error);
//                     }
//                 );
//             },
//             null,
//             null,
//         );
//         return result;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

async function updateAddressById(updatedAddressData: TypeAddressData): Promise<TypeAddressData> {
    try {
        let db = dbInit;
        if (dbInit === undefined || db.transaction === undefined) {
            db = await SQLite.openDatabase({ name: "addresses.db", location: 'default' });
        }
        SQLite.enablePromise(true);
        // Извлекаем новые данные из объекта updatedAddressData
        const { name, arrayCountersName, email, city, street, building, apartment, active, id } = updatedAddressData;

        const updatedAddress = await new Promise<TypeAddressData>((resolve, reject) => {
            db.transaction(
                (tx: any) => {
                    tx.executeSql(
                        "UPDATE addresses SET name = ?, arrayCountersName = ?, city = ?, street = ?, building = ?, apartment = ?, email = ?, active = ? WHERE id = ?",
                        [name, arrayCountersName, city, street, building, apartment, email, active, id],
                        (_: any, result: any) => {
                            console.log(`Документ с ID ${id} успешно обновлен в таблице.`);

                            tx.executeSql(
                                "SELECT * FROM addresses WHERE id = ?;",
                                [id],
                                (_: any, result: any) => {
                                    const updatedAddress = result.rows.raw()[0];
                                    resolve(updatedAddress);
                                },
                                (_: any, error: any) => {
                                    reject(error);
                                }
                            );
                        },
                        (_: any, error: any) => {
                            console.error(`Ошибка при обновлении документа с ID ${id} в таблице :`, error);
                            reject(error);
                        }
                    );
                },
                null,
                null,
            );
        });

        return updatedAddress;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Асинхронно удаляет адрес из таблицы "addresses" базы данных SQLite по указанному id.
 *
 * @param {number} addressId - Идентификатор адреса, который необходимо удалить.
 * @param {Function} successCallback - Функция обратного вызова, вызываемая после успешного удаления адреса.
 * @param {Function} errorCallback - Функция обратного вызова, вызываемая в случае ошибки при удалении адреса.
 * @returns {Promise<void>} Промис, который разрешается после успешного выполнения операции удаления адреса.
 * @throws {Error} Ошибка в случае проблем с удалением адреса.
 *
 * @example
 * // Пример использования:
 * deleteAddressById(
 *   123, // Здесь нужно указать реальный идентификатор адреса
 *   () => {
 *     console.log("Адрес успешно удален из таблицы 'addresses'");
 *     // Дополнительные действия после удаления адреса
 *   },
 *   (error) => {
 *     console.error("Ошибка при удалении адреса:", error);
 *     // Обработка ошибки при удалении адреса
 *   }
 * );
 */
const deleteAddressById = async (addressId: number, successCallback: () => void, errorCallback: (error: any) => void): Promise<void> => {
    try {
        let db = dbInit;
        if (dbInit === undefined || db.transaction === undefined) {
            db = await SQLite.openDatabase({ name: "addresses.db", location: 'default' });
        }
        SQLite.enablePromise(true);

        await db.transaction(
            async (tx: any) => {
                // Удаляем адрес из таблицы "addresses" по указанному id
                await tx.executeSql(
                    "DELETE FROM addresses WHERE id = ?;",
                    [addressId],
                    () => {
                        console.log(`Адрес с id ${addressId} успешно удален из таблицы 'addresses'`);
                        successCallback();
                    },
                    (_, error: any) => {
                        console.error("Ошибка при удалении адреса:", error);
                        errorCallback(error);
                    }
                );
            },
            null,
            null,
            (error: any) => {
                console.error("Ошибка при выполнении SQL-запроса:", error);
                errorCallback(error);
            }
        );
    } catch (error) {
        console.log(error);
        throw new Error("Произошла ошибка при удалении адреса из таблицы 'addresses'");
    }
};

/**
 * Асинхронно извлекает все адреса из таблицы "addresses" базы данных SQLite.
 *
 * @returns {Promise<Array<TypeAddressData>>} Промис с массивом объектов, представляющих адреса.
 * @throws {Error} Ошибка в случае проблем с извлечением адресов.
 *
 * @example
 * // Пример использования:
 * getAllAddresses()
 *   .then((addresses) => {
 *     console.log("Список всех адресов:", addresses);
 *     // Дополнительные действия с массивом адресов
 *   })
 *   .catch((error) => {
 *     console.error("Ошибка при извлечении адресов:", error);
 *     // Обработка ошибки при извлечении адресов
 *   });
 */
const getAllAddresses = async (): Promise<Array<TypeAddressData>> => {
    try {
        let db = dbInit;
        if (dbInit === undefined || db.transaction === undefined) {
            db = await SQLite.openDatabase({ name: "addresses.db", location: 'default' });
        }
        SQLite.enablePromise(true);

        return new Promise((resolve, reject) => {
            db.transaction(
                async (tx: any) => {
                    // Извлекаем все адреса из таблицы "addresses"
                    tx.executeSql(
                        "SELECT * FROM addresses;",
                        [],
                        (_, result: any) => {
                            const addressesData = result.rows.raw(); // Получаем данные в виде массива объектов
                            if (addressesData.length > 0) {
                                resolve(addressesData);
                            } else {
                                resolve([]);
                            }
                        },
                        (error: any) => {
                            reject(new Error(`Ошибка при выполнении SQL-запроса: ${error}`));
                        },
                        null
                    );
                });
        },

        );

    } catch (error) {
        console.log(error);
        throw new Error("Произошла ошибка при извлечении адресов из таблицы 'addresses'");
    }
}



export { openOrCreateDatabase, getAllAddresses, createNewAddress, updateAddressById, deleteAddressById }