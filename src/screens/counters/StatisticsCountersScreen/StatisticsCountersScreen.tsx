import { ReactNode, useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import * as Localization from 'react-native-localize';
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from '../../../contexts/theme/ThemeContext';
import { useGlobal } from '../../../contexts/global/GlobalContext';
import { useTranslate } from "../../../contexts/translate/TranslateContext";
import { deleteMeterCounterRecordById, findRecordsByIdAddress } from "../../../utils/db/SQLite/dbMeterReadingSubmission";
import { TypeCounterMeters } from "../types/types";

import imgArrow from "../../../../images/arrow-sm-left-svgrepo-com.png";
import HeaderListReadings from "./components/HeaderListReadings";
import FooterListReadings from "./components/FooterListReadings";
import ItemListReadings from "./components/ItemListReadings";
import FormTwoTextButton from "../../../componentsShared/forms/FormTwoTextButton";
import ModalWithChildren from "../../../componentsShared/modals/ModalWithChildren";

/** Экран с отображением статистики по показаним счетчиков */
function StatisticsCountersScreen({ navigation }) {
    const { backgroundColor, colorText } = useTheme();
    const { address } = useGlobal();
    const { selectedTranslations, locale } = useTranslate();

    const [selectedItem, setSelectedItem] = useState<any>();
    const [selectedYear, setSelectedYear] = useState<any>();
    const [years, setYears] = useState<number[]>();
    const [records, setRecords] = useState<any[]>([]);
    const [dataForChart, setDataForChart] = useState<any>();
    const [isOpenFormRemoveReadings, setIsOpenFormRemoveReadings] = useState<boolean>(false);
    const [isLoadingRemoveReadings, setIsLoadingRemoveReadings] = useState<boolean>(false);

    async function fillRecords() {
        const arrayRecords = await findRecordsByIdAddress(address.id.toString());
        const sortArrayRecords = arrayRecords.sort((a: TypeCounterMeters, b: TypeCounterMeters) => new Date(b.date) - new Date(a.date));
        setRecords(sortArrayRecords);
        return arrayRecords;
    }

    function onBack() {
        navigation.navigate('CountersInfoScreen')
    }

    function handleCkickRemove(item: any) {
        setIsOpenFormRemoveReadings(true);
        setSelectedItem(item);
    }

    async function removeReadings() {
        setIsLoadingRemoveReadings(true);
        try {
            await deleteMeterCounterRecordById(selectedItem.id,
                () => {
                    const array = records.filter(record => record.id !== selectedItem.id);
                    setRecords(array);
                    setIsLoadingRemoveReadings(false);
                    setIsOpenFormRemoveReadings(false);
                },
                () => { setIsLoadingRemoveReadings(false); }
            );
        }
        catch (err) {
            setIsLoadingRemoveReadings(false);
        }
    }

    function transformArray(records: any) {
        let data: any = []
        const currentLocale = Localization.getLocales()[0]?.languageCode;
        const arr = records.filter((record: any) => {
            const date = new Date(record.date);
            const year = date.getFullYear();
            return year === selectedYear;
        })
        arr.forEach((item: any) => {
            const date = new Date(item.date);
            const monthName = date.toLocaleString(currentLocale, { month: 'short' });
            const monthNumber = date.toLocaleString(currentLocale, { month: 'numeric' });
            const arrayRedings = JSON.parse(item.meterReadings);
            const totalCost = arrayRedings.reduce((acc: number, item: any) => {
                return acc + Number(item.meterReading.cost);
            }, 0)

            const obj = {
                month: monthName,
                monthNumber: monthNumber,
                cost: totalCost,
            }

            const findMonth = data.find((item: any) => item.month === monthName);
            if (findMonth) {
                findMonth.cost += totalCost;
            } else {
                data.push(obj);
            }
        })

        const filterArray = data.sort((a: any, b: any) => a.monthNumber - b.monthNumber);
        return filterArray;
    }

    function getYearsRecords(records: any) {
        let array: any = [];
        records.forEach((item: any) => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const finded = array.includes(year);
            if (!finded) {
                array.push(year);
            }
        })
        const sortArray = array.sort((a: any, b: any) => b - a);
        return sortArray;
    }

    function getCurrentYear() {
        const date = new Date();
        const year = date.getFullYear();
        setSelectedYear(year);
    }

    function selectYear(year: number) {
        setSelectedYear(year);
    }

    // будет выполняться при каждом фокусе на экране
    useFocusEffect(
        useCallback(() => {
            //при фокусе на экране
            fillRecords();
            getCurrentYear();
        }, [])
    );

    useEffect(() => {
        const years = getYearsRecords(records);
        const dataForChart = transformArray(records);
        setYears(years);
        setDataForChart(dataForChart);
    }, [records, selectedYear])

    const ItemSeparator = () => (
        <View style={styles.separator}></View>
    );

    // Компоненты FlatList
    
    const HeaderList = () => {
        return (
            <HeaderListReadings
                dataForChart={dataForChart}
                years={years ? years : []}
                selectedYear={selectedYear}
                selectYear={selectYear}
            />
        )
    }

    type ItemListProps = {
        item: any;
    };
    const ItemList: React.FC<ItemListProps> = ({ item }) => {
        return (
            <ItemListReadings
                item={item}
                handleCkickRemove={handleCkickRemove}
                selectedTranslations={selectedTranslations}
                locale={locale}
                address={address}
                colorText={colorText}
            />)
    };

    return (
        <View style={[styles.container, backgroundColor]}>
            <TouchableOpacity style={styles.buttonBack} onPress={onBack}>
                <Image source={imgArrow} style={styles.imgButtonClose} />
            </TouchableOpacity>
            <FlatList
                data={records}
                renderItem={ItemList}
                keyExtractor={item => item.id ? item.id : item.date}
                style={styles.flatList} // Применение стилей к FlatList
                ListHeaderComponent={HeaderList}
                ListFooterComponent={FooterListReadings} // компонент-футер
                ItemSeparatorComponent={ItemSeparator}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            />
            <ModalWithChildren
                isVisible={isOpenFormRemoveReadings}
                onClose={() => setIsOpenFormRemoveReadings(false)}
                childComponent={
                    <FormTwoTextButton
                        text={selectedTranslations.remove}
                        textButtonOne={selectedTranslations.yes}
                        textButtonTwo={selectedTranslations.no}
                        onClickOne={removeReadings}
                        onClickTwo={() => setIsOpenFormRemoveReadings(false)}
                        isSubmitLoading={isLoadingRemoveReadings}
                    />
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        width: '100%',
    },
    separator: {
        height: 30,
    },
    buttonBack: {
        position: 'absolute',
        width: '100%',
        top: 20,
        left: 10,
        paddingBottom: 10,
        opacity: 0.7,
        zIndex: 999,
    },
    imgButtonClose: {
        width: 30,
        height: 30,
    },
});

export default StatisticsCountersScreen;

//Примеры
// @records
// {"date": "Sun Jan 21 2024 16:30:03 GMT+0500",
//  "id": 1,
//   "idAddress": "1",
//    "meterReadings": "[
//     {\"nameCounter\":\"Холодная вода\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}},
//     {\"nameCounter\":\"Горячая вода\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}},
//     {\"nameCounter\":\"Электричество\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}},
//     {\"nameCounter\":\"Отопление\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}},
//     {\"nameCounter\":\"Газ\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}}]"
// }