import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

//Контекст
import { useTranslate } from '../../../contexts/translate/TranslateContext';
import { useGlobal } from '../../../contexts/global/GlobalContext';
import { useTheme } from '../../../contexts/theme/ThemeContext';
import { getCurrentDateByString, findNearestDateObject, getDataAndNearestReadingCounter } from '../utils/functions';
import { TypeCounterInfo, TypeCounterMeters } from "../types/types";
import { createMeterCounterRecord, findRecordsByIdCounter } from "../../../utils/db/SQLite/dbCountersReading";
import { updateDocumentById } from "../../../utils/db/SQLite/dbCounters";

import ScreenCounter from "../sharedCountersComponents/screenCounter/ScreenCounter";
import Loader from "../../../componentsShared/loaders/Loader";

const HotWaterCounetrsScreen = () => {

    const { selectedTranslations } = useTranslate();
    const { address } = useGlobal();
    const { theme, backgroundColor } = useTheme();

    // Текущие показания счетчика и информация о счетчиках
    const [hotWaterCurrent, setHotWaterCurrent] = useState<TypeCounterInfo>();
    const [currentHotWaterReading, setCurrentHotWaterReading] = useState<TypeCounterMeters>();
    //Лоадер
    const [isLoaderSaveData, setIsLoaderSaveData] = useState<boolean>(false);
    const [isLoadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    // Модальные окна
    const [isOpenedInfotool, setIsopenedInfotool] = useState<boolean>(false);
    const [isOpenedFormUpdateAndInfo, setOpenedFormUpdateAndInfo] = useState<boolean>(false);

    function openInfoTool() {
        setIsopenedInfotool(true);
    }

    function closeInfoTool() {
        setIsopenedInfotool(false);
    }

    function openFormUpdateAndInfo() {
        setOpenedFormUpdateAndInfo(true);
    }

    function closeFormUpdateAndInfo() {
        setOpenedFormUpdateAndInfo(false);
    }

    /**
     * Асинхронно сохраняет данные счетчиков.
     *
     * @param {Object} data - Объект с данными для сохранения.
     * @param {string} [data.inputOne] - Данные для первого счетчика.
     * @param {string} [data.inputTwo] - Данные для второго счетчика.
     * @returns {Promise<void>} Промис, который разрешается после успешного сохранения данных.
     *
     * @throws {Error} Ошибка в случае проблем с сохранением данных.
     *
     * @example
     * // Пример использования:
     * saveData({
     *   inputOne: '123',
     *   inputTwo: '456',
     * }).then(() => {
     *   console.log("Данные успешно сохранены.");
     * }).catch((error) => {
     *   console.error("Ошибка при сохранении данных:", error);
     * });
     */
    async function saveData(data: { inputOne?: string, inputTwo?: string }) {
        try {
            setIsLoaderSaveData(true);
            const saveReading = async (inputData: string, currentCounter: TypeCounterInfo) => {
                if (inputData && currentCounter?.id) {
                    const dataReading = {
                        idCounter: currentCounter.id.toString(),
                        data: inputData,
                        date: getCurrentDateByString(),
                    };
                    await createMeterCounterRecord(dataReading, () => {
                        getDataWaterCounters();
                        setTimeout(() => {
                            setIsLoaderSaveData(false)
                        }, 1000);
                    });
                }
            };
            if (data && data.inputOne && hotWaterCurrent) {
                await saveReading(data.inputOne, hotWaterCurrent);
            }
        }
        catch (err) {
            console.log(err);
            setIsLoaderSaveData(false);
        }
    }

    async function sumbitUpdateCounter(dataUpdate: TypeCounterInfo) {
        setLoadingUpdate(true);
        await updateDocumentById(dataUpdate,
            () => {
                getDataWaterCounters();
                setTimeout(() => {
                    setLoadingUpdate(false);
                    closeFormUpdateAndInfo();
                }, 800)
            })

    }

    /**
    * Асинхронно получает данные о счетчиках горячей и холодной воды, а также ближайшие показания счетчиков.
    *
    * @async
    * @function
    * @returns {Promise<void>} Промис, который разрешается после успешного получения данных и установки состояний.
    *
    * @throws {Error} Ошибка в случае проблем с получением данных.
    *
    * @example
    * // Пример использования:
    * try {
    *   await getDataWaterCounters();
    *   console.log("Данные о счетчиках и показания успешно получены и установлены.");
    * } catch (error) {
    *   console.error("Ошибка при получении данных о счетчиках и показаниях:", error);
    * }
    */
    async function getDataWaterCounters() {
        try {
            // Получение данных о счетчиках горячей и холодной воды
            const hotWater = await getDataAndNearestReadingCounter(address.id.toString(), 'Горячая вода',
                async (counterData) => {
                    if (counterData && counterData.id) {
                        const dataReading = {
                            idCounter: counterData.id.toString(),
                            data: '0',
                            date: getCurrentDateByString(),
                        };

                        await createMeterCounterRecord(dataReading, () => {
                            setTimeout(() => {
                                setIsLoaderSaveData(false)
                            }, 1000);
                        });
                    }
                });
            // Установка состояний текущих счетчиков
            if (hotWater && hotWater.counterInfo) {
                setHotWaterCurrent(hotWater.counterInfo);
            }

            // Получение ближайших показаний счетчиков горячей и холодной воды
            if (hotWater.nearestReading) {
                setCurrentHotWaterReading(hotWater.nearestReading);
            }

        } catch (error) {
            console.error("Произошла ошибка при получении данных о счетчиках и показаниях:", error);
            throw new Error("Ошибка при получении данных о счетчиках и показаниях");
        }
    }

    useEffect(() => {
        if (address) {
            getDataWaterCounters();
        }
    }, [address])

    return (
        hotWaterCurrent ?
            <ScreenCounter
                dataCounter={hotWaterCurrent}
                placeholder={selectedTranslations.placeHolderInputCouner}
                saveData={saveData}
                onClickCounter={openFormUpdateAndInfo}
                isLoaderSaveData={isLoaderSaveData}
                isOpenedInfotool={isOpenedInfotool}
                isOpenedFormUpdateAndInfo={isOpenedFormUpdateAndInfo}
                openFormUpdateAndInfo={openFormUpdateAndInfo}
                currentReading={currentHotWaterReading}
                sumbitUpdateCounter={sumbitUpdateCounter}
                isLoadingUpdateCounter={isLoadingUpdate}
                closeFormUpdateAndInfo={closeFormUpdateAndInfo}
                theme={theme}
            />
            : <View style={[styles.container, backgroundColor]}><Loader /></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default HotWaterCounetrsScreen;