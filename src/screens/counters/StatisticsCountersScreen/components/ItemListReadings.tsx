import { useEffect, useState } from "react"
import { LayoutAnimation, StyleSheet, Text, View } from "react-native"
import ListInfo from "./ListInfo";
import TextInputWithLabelInside from "../../../../componentsShared/Inputs/TextInputWithLabelInside";
import ButtonMoreInfo from "../../../../componentsShared/buttons/ButtonMoreInfo";

interface ItemListReadingsProps {
    item: {
        date: string;
        id: number;
        idAddress: string;
        meterReadings: string;
    };
    selectedTranslations?: {
        arrayUnitsOfMeasurement: { name: string; nameCounter: string }[];
        totalCost: string;
        cost: string;
        moreInfo: string;
    };
    address?: any; // Тип данных для address
    colorText?: any;
    handleCkickRemove: (item: any) => void | void;
    locale: string;
}

/**
 * Компонент для отображения данных по счетчикам в списке.
 *
 * @component
 * @example
 * const item = {
 *   date: "Sun Jan 21 2024 16:30:03 GMT+0500",
 *   id: 1,
 *   idAddress: "1",
 *   meterReadings: "[{\"nameCounter\":\"Холодная вода\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}}]"
 * };
 * const selectedTranslations = {
 *   arrayUnitsOfMeasurement: [{ name: "Холодная вода", nameCounter: "Cold water" }],
 *   totalCost: "Total Cost",
 *   cost: "Cost",
 *   moreInfo: "More Info"
 * };
 * const address = {...}; // Тип данных для address
 *
 * <ItemListReadings item={item} selectedTranslations={selectedTranslations} address={address} />
 *
 * @param {object} props - Свойства компонента
 * @param {object} props.item - Объект с данными о счетчиках
 * @param {string} props.item.date - Дата записи
 * @param {number} props.item.id - Идентификатор записи
 * @param {string} props.item.idAddress - Идентификатор адреса
 * @param {string} props.item.meterReadings - Данные о счетчиках в виде строки JSON
 * @param {object} props.selectedTranslations - Переводы для отображения
 * @param {object[]} props.selectedTranslations.arrayUnitsOfMeasurement - Массив объектов с переводами
 * @param {string} props.selectedTranslations.arrayUnitsOfMeasurement[].name - Оригинальное название
 * @param {string} props.selectedTranslations.arrayUnitsOfMeasurement[].nameCounter - Переведенное название
 * @param {string} props.selectedTranslations.totalCost - Общая стоимость
 * @param {string} props.selectedTranslations.cost - Стоимость
 * @param {string} props.selectedTranslations.moreInfo - Больше информации
 * @param {object} props.address - Данные адреса (замените {...} на соответствующий тип)
 */
const ItemListReadings: React.FC<ItemListReadingsProps> = ({ item, selectedTranslations, address, colorText, handleCkickRemove, locale }) => {

    const arrayCountersObj = [
        { nameCounter: 'Холодная вода', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Горячая вода', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Электричество', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Отопление', data: 'Данные счетчика', date: new Date().toString() },
        { nameScreen: 'Gas', nameCounter: 'Газ', data: 'Данные счетчика', date: new Date().toString() },
    ]

    const [currents, setCurrents] = useState<any>(arrayCountersObj);
    const [countersData, setCountersData] = useState<any>([]);
    const [statistic, setStatistic] = useState<any>([]);
    const [cost, setCost] = useState<string>('0');
    const [backgroundColorContainerInfo, setBackgroundColorContainerInfo] = useState(`backgroundColor: 'rgba(0,0,0,0.1)`)
    const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);
    //Лоадеры
    const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
    const [isLoadingSend, setIsLoadingSend] = useState<boolean>(false);

    type MeterReading = {
        nameCounter: string;
        meterReading: {
            currentReading: string;
            volume: string;
            cost: string;
        };
    };
    function getCost(array: MeterReading[]) {
        const totalCost = array.reduce((sum, item) => {
            return sum + parseFloat(item.meterReading.cost);
        }, 0);
        setCost(totalCost.toFixed(2));
    }

    function getCounterName(nameCounter: string) {
        const findCurrentName = selectedTranslations?.arrayUnitsOfMeasurement.find((item: any) => item.name === nameCounter);
        const name = findCurrentName?.nameCounter;
        return name;
    }

    function getCounterReading(counterReading: string) {


    }

    function openMoreInfo() {
        setIsShowMoreInfo(!isShowMoreInfo);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    function fillCountersData() {
        let array = [];
        try {
            array = JSON.parse(item.meterReadings);
        } catch (error) {
            console.error('Ошибка при разборе JSON:', error);
            // Обработка ошибки, например, установка значения по умолчанию или другие действия
            array = [];
        }
        getCost(array)
        setCountersData(array);
    }

    function getDate() {
        const date = new Date(item.date);
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
    
        return date.toLocaleDateString(locale, options);
    }

    function onClickRemove() {
        handleCkickRemove(item)
    }

    useEffect(() => {
        if (item) {
            fillCountersData();
        }
    }, [item])


    return (
        <View style={[styles.containerInfo, { backgroundColor: backgroundColorContainerInfo }]}>
            <>
                <Text style={[styles.title, colorText]}>{getDate()}</Text>
                {countersData.map((counter: any) => {
                    return (
                        <TextInputWithLabelInside
                            key={counter.nameCounter}
                            label={getCounterName(counter.nameCounter)}
                            placeholder={getCounterName(counter.nameCounter)}
                            value={counter.meterReading.currentReading}
                            onClickInput={() => { console.log('onClickInput') }}
                            onChangeText={() => { }}
                        />
                    )
                })}
            </>
            <TextInputWithLabelInside
                label={selectedTranslations?.totalCost}
                placeholder={selectedTranslations?.cost}
                value={cost}
                onClickInput={() => { }}
                onChangeText={() => { }}
            />
            <View style={styles.buttonMoreInfo}>
                <ButtonMoreInfo
                    text={selectedTranslations ? selectedTranslations.moreInfo : ''}
                    controlShow={openMoreInfo}
                    isShow={isShowMoreInfo}
                />
                <ButtonMoreInfo
                    text={selectedTranslations ? selectedTranslations.remove : ''}
                    controlShow={onClickRemove}
                    isShow={isShowMoreInfo}
                    isImg={false}
                />
            </View>
            {isShowMoreInfo ?
                <ListInfo countersData={countersData} />
                : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: '700',
    },
    container: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 170,
    },
    containerInfo: {
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
    },
    containerButtons: {
        marginTop: 20,
        alignItems: 'center',
        width: '90%',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textNameButtonContainer: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',
    },
    buttonMoreInfo: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})

export default ItemListReadings;

// {
// "date": "Sun Jan 21 2024 16:30:03 GMT+0500", 
// "id": 1,
//  "idAddress": "1",
//   "meterReadings":
//    "[{\"nameCounter\":\"Холодная вода\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}},
//    {\"nameCounter\":\"Горячая вода\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}},
//    {\"nameCounter\":\"Электричество\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}},
//    {\"nameCounter\":\"Отопление\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}},
//    {\"nameCounter\":\"Газ\",\"meterReading\":{\"currentReading\":\"15\",\"volume\":\"5.000\",\"cost\":\"5.000\"}}]"
// }