import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
//Контекст
import { useTheme } from '../../../contexts/theme/ThemeContext';
import { useGlobal } from '../../../contexts/global/GlobalContext';

import FormSendAndSaveCountersData from "../../../componentsShared/forms/counters/FormSendAndSaveCountersData";
import { getDataByCounterNameAndAddressId } from "../../../utils/db/SQLite/dbCounters";
import { TypeCounterInfo, TypeCounterMeters } from "../types/types";
import { findRecordsByIdCounter } from "../../../utils/db/SQLite/dbCountersReading";
import Loader from "../../../componentsShared/loaders/Loader";
import ButtonSetting from "../../setting/GlobalSettingScreen/components/ButtonSetting";

interface TypeCounterData extends TypeCounterInfo {
    closestReading?: { key: string; value: string };
    previousReading?: { key: string; value: string };
}

/**
 * Экран с информацией о показаниях счетчиков и возможностью сохранить новую запись.
 *
 * @component
 * @returns {JSX.Element} Элемент экрана с информацией о показаниях счетчика.
 */
const CountersInfoScreen = ({ navigation }) => {

    const { backgroundColor } = useTheme();
    const { address } = useGlobal();
    const [counters, setCounters] = useState<TypeCounterInfo[]>([]);

    /**
    * Находит два объекта в массиве с датами, максимально близких к текущей дате.
    *
    * @param {Array} data - Массив объектов с ключем 'date', содержащим дату в виде строки.
    * @returns {Array} Массив объектов, в котором первый объект содержит ближайшую дату к текущей, а второй - следующую после нее.
    *[{ closestDate: '2023-01-18'}, {nextDate: '2023-01-20' }]
    */
    async function findClosestDates(data: TypeCounterMeters[]) {
        if (data.length === 1) {
            const updateData = data.map((item) => {
                return { closest: { ...item } }
            })
            console.log(updateData)
            return updateData;
        } else if (data.length < 1) {
            return [];
        } else {
            const currentDate: any = new Date();
            let closestDates: { closest: TypeCounterMeters }[] = [];
            let closestMillisDiff = Infinity;

            data.forEach((item1, index1) => {
                data.forEach((item2, index2) => {
                    if (index1 !== index2) {
                        const date1: any = new Date(item1.date);
                        const date2: any = new Date(item2.date);
                        const millisDiff = Math.abs(currentDate - date1) + Math.abs(currentDate - date2);

                        if (millisDiff < closestMillisDiff) {
                            closestMillisDiff = millisDiff;
                            closestDates = [
                                { closest: { ...item2 } },
                                { later: { ...item1 } },
                            ];
                        }
                    }
                });
            });

            return closestDates;
        }
    }

    /** Наполняет массив объектов данных о счетчиках */
    async function fillCountersInfo() {
        const arrayCountersName = JSON.parse(address.arrayCountersName);
        let arrayCounters: TypeCounterInfo[] = [];

        for (const name of arrayCountersName) {
            let counterData: TypeCounterData | undefined = await getDataByCounterNameAndAddressId(address.id.toString(), name);
            if (counterData && counterData.id) {
                let counterReading = await findRecordsByIdCounter(counterData.id.toString());
                const arrayNearestReadings = await findClosestDates(counterReading);
                if (arrayNearestReadings.length > 0) {
                    counterData.closestReading = arrayNearestReadings[0].closest;
                    if (counterData.previousReading) {
                        counterData.previousReading = arrayNearestReadings[1].later;
                    }
                }
                arrayCounters.push(counterData);
            }
        }
        setCounters(arrayCounters);
    }

    function onClikNavigationStatisticScreen() {
        navigation.navigate('StatisticsCountersScreen')
    }

    useEffect(() => {
        // fillCountersInfo();
    }, [address])

    // будет выполняться при каждом фокусе на экране
    useFocusEffect(
        useCallback(() => {
            //при фокусе на экране
            fillCountersInfo();
        }, [])
    );

    return (
        <ScrollView style={[styles.container, backgroundColor]} contentContainerStyle={{ alignItems: 'center' }}>
            {counters && counters.length ?
                <>
                    <FormSendAndSaveCountersData countersData={counters} onClikNavigationStatisticScreen={onClikNavigationStatisticScreen} />
                </>
                : <Loader />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default CountersInfoScreen;