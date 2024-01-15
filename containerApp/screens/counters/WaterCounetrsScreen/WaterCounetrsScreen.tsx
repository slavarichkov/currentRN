import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import FormAddCountersData from "../../../componentsShared/forms/counters/FormAddCountersData";
import { useTranslate } from '../../../contexts/translate/TranslateContext';
import ModalWithChildren from "../../../componentsShared/modals/ModalWithChildren";
import { getDataCounters, getCurrentDateByString, findNearestDateObject, getDataAndNearestReadingCounter } from '../../counters/utils/functions';
import { TypeCounterInfo } from "../types/types";
import { createMeterCounterRecord, findRecordsByIdCounter } from "../../../utils/db/SQLite/dbCountersReading";

const WaterCounetrsScreen = ({ navigation }) => {

    const { selectedTranslations } = useTranslate();

    const [isOpenedInfotool, setIsopenedInfotool] = useState<boolean>(false);
    const [isOpenedFormUpdateAndInfo, setOpenedFormUpdateAndInfo] = useState<boolean>(false);
    // Текущие показания счетчика и информация о счетчиках
    const [hotWaterCurrent, setHotWaterCurrent] = useState<TypeCounterInfo>();
    const [coldWaterCurrent, setColdWaterCurrent] = useState<TypeCounterInfo>();
    const [currentHotWaterReading, setCurrentHotWaterReading] = useState<string>('');
    const [currentColdWaterReading, setCurrentColdWaterReading] = useState<string>('');
    //Лоадер
    const [isLoaderSaveData, setIsLoaderSaveData] = useState<boolean>(false);


    async function saveData(data: { inputOne?: string, inputTwo?: string }) {
        try {
            // setIsLoaderSaveData(true);
            // if (data.inputOne && hotWaterCurrent?.id) {
            //     const dataReading = {
            //         idCounter: hotWaterCurrent.id.toString(),
            //         data: data.inputOne,
            //         date: getCurrentDateByString(),
            //     }
            //     await createMeterCounterRecord(dataReading, () => { })
            // }
         
            if (data.inputTwo && coldWaterCurrent?.id) {
                const dataReading = {
                    idCounter: coldWaterCurrent.id.toString(),
                    data: data.inputTwo,
                    date: getCurrentDateByString(),
                }
                console.log(dataReading)
                await createMeterCounterRecord(dataReading, () => { })
            }
            setIsLoaderSaveData(false);
        }
        catch (err) {
            console.log(err);
            setIsLoaderSaveData(false);
        }
    }

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
            const hotWater = await getDataAndNearestReadingCounter('Горячая вода');
            const coldWater = await getDataAndNearestReadingCounter('Холодная вода');

            // Установка состояний текущих счетчиков
            if (hotWater && hotWater.counterInfo) {
                setHotWaterCurrent(hotWater.counterInfo);
            }

            if (coldWater && coldWater.counterInfo) {
                setColdWaterCurrent(coldWater.counterInfo);
            }

            // Получение ближайших показаний счетчиков горячей и холодной воды
            if (hotWater.nearestReading) {
                setCurrentHotWaterReading(hotWater.nearestReading);
            }

            if (coldWater.nearestReading) {
                setCurrentColdWaterReading(coldWater.nearestReading);
            }

        } catch (error) {
            console.error("Произошла ошибка при получении данных о счетчиках и показаниях:", error);
            throw new Error("Ошибка при получении данных о счетчиках и показаниях");
        }
    }

    useEffect(() => {
        getDataWaterCounters();
    }, [])

    return (
        <View style={styles.container}>
            <FormAddCountersData
                onSubmitForm={saveData}
                inputOneLabel={selectedTranslations.hotWater}
                inputTwoLabel={selectedTranslations.coldWater}
                onePlaceholder={selectedTranslations.placeHolderInputCouner}
                onClickInfoOneCounter={openFormUpdateAndInfo}
                onClickInfoTwoCounter={openFormUpdateAndInfo}
                currentOneCurrentMeter={currentHotWaterReading}
                currentTwoCurrentMeter={currentColdWaterReading}
                isLoadingSubmit={isLoaderSaveData}
            />
            <ModalWithChildren
                isVisible={isOpenedFormUpdateAndInfo}
                onClose={closeFormUpdateAndInfo}
                theme={'dark'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 170,
    }
});

export default WaterCounetrsScreen;