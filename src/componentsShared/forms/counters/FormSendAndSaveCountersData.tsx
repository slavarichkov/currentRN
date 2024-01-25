import { useEffect, useState } from "react"
import { LayoutAnimation, StyleSheet, Text, View } from "react-native"
import { useTranslate } from '../../../contexts/translate/TranslateContext';
import { useGlobal } from '../../../contexts/global/GlobalContext';
import { useTheme } from '../../../contexts/theme/ThemeContext';
import { TypeCounterInfo } from "../../../screens/counters/types/types";
import { createMeterCounterRecord } from "../../../utils/db/SQLite/dbMeterReadingSubmission";
import { sendEmail } from "../../../utils/funtions";
import ListInfo from "../../../screens/counters/CountersInfoScreen/components/ListInfo";
import TextInputWithLabelInside from "../../Inputs/TextInputWithLabelInside"
import ButtonSetting from "../../../screens/setting/GlobalSettingScreen/components/ButtonSetting";
import ButtonMoreInfo from "../../buttons/ButtonMoreInfo";
import ModalWithChildren from "../../modals/ModalWithChildren";

interface Reading {
    data: string;
    date: string;
    id: number;
    idCounter: string;
}

interface CounterInfo {
    address: string;
    closestReading: Reading;
    costOfaUnitOfMeasurement: string;
    counterNumber: string;
    dateOfCounterVerification: string;
    dateOfCounterVerificationNext: string;
    id: number;
    name: string;
    previousReading: Reading;
}

interface TypeCounterData extends TypeCounterInfo {
    closestReading?: { key: string; value: string };
    previousReading?: { key: string; value: string };
}
interface FormSendAndSaveCountersDataProps {
    countersData: CounterInfo[]; // Подставьте тип для countersData
    onClikNavigationStatisticScreen: () => void;
}

const FormSendAndSaveCountersData: React.FC<FormSendAndSaveCountersDataProps> = ({ countersData, onClikNavigationStatisticScreen }) => {

    const { selectedTranslations, locale  } = useTranslate();
    const { address } = useGlobal();
    const { backgroundColor, colorText } = useTheme();
    const arrayCountersObj = [
        { nameCounter: 'Холодная вода', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Горячая вода', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Электричество', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Отопление', data: 'Данные счетчика', date: new Date().toString() },
        { nameScreen: 'Gas', nameCounter: 'Газ', data: 'Данные счетчика', date: new Date().toString() },
    ]

    const [statistic, setStatistic] = useState<any>([]);
    const [cost, setCost] = useState<string>('0');
    const [backgroundColorContainerInfo, setBackgroundColorContainerInfo] = useState(`backgroundColor: 'rgba(0,0,0,0.1)`)
    //Инфотул
    const [isOpenInfoTool, setIsOpenInfoTool] = useState<boolean>(false)
    const [messageInfoTool, setMessageInfoTool] = useState<string>('');
    const [isShowMoreInfo, setIsShowMoreInfo] = useState<boolean>(false);
    //Лоадеры
    const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
    const [isLoadingSend, setIsLoadingSend] = useState<boolean>(false);

    function getCostAndValue(data, costValue) {
        const statisticObj: any = { name: data.name };
        if (data && data.closestReading && data.closestReading.data) {
            // Ближайшие данные 
            const closestReading = Number(data.closestReading.data);
            // Предыдущие данные
            let previousReading = 0;
            if (data.previousReading && data.previousReading.data) {
                previousReading = Number(data.previousReading.data);
            }
            // Объем потребления с предыдущих показаний
            const volume = closestReading - previousReading;
            statisticObj.volume = volume.toFixed(3);
            //Стоимость
            const cost = volume * Number(data.costOfaUnitOfMeasurement);
            statisticObj.cost = cost.toFixed(3);
            if (costValue) {
                costValue = cost + costValue;
            }
        } else {
            statisticObj.volume = '0';
            statisticObj.cost = '0';
        }
        return statisticObj;

    }

    /**
     * Асинхронно получает статистику по счетчикам и устанавливает ее в состояние.
     *
     * @async
     * @function
     * @returns {Promise<void>} Промис, который завершается, когда статистика установлена в состояние. [{"cost": 0, "name": "Холодная вода", "volume": 0}, {"cost": 0, "name": "Горячая вода", "volume": 0}, {"cost": 0, "name": "Электричество", "volume": 0}, {"cost": 0, "name": "Отопление", "volume": 0}, {"cost": 0, "name": "Газ", "volume": 0}]
     * @throws {Error} Если не удалось получить статистику.
     */
    async function getStatistic() {
        let array: any = [];
        let costValue: number = 0;
        if (countersData.length > 1) {
            const promises = countersData.map(async (data) => {
                const statisticObj: any = { name: data.name };
                if (data && data.closestReading && data.closestReading.data) {
                    // Ближайшие данные 
                    const closestReading = Number(data.closestReading.data);
                    // Предыдущие данные
                    let previousReading = 0;
                    if (data.previousReading && data.previousReading.data) {
                        previousReading = Number(data.previousReading.data);
                    }
                    // Объем потребления с предыдущих показаний
                    const volume = closestReading - previousReading;
                    statisticObj.volume = volume.toFixed(3);
                    //Стоимость
                    const cost = volume * Number(data.costOfaUnitOfMeasurement);
                    statisticObj.cost = cost.toFixed(3);
                    costValue = cost + costValue;
                } else {
                    statisticObj.volume = '0';
                    statisticObj.cost = '0';
                }

                return statisticObj;
            });
            array = await Promise.all(promises);
        }
        setStatistic(array);
        let costText = `${costValue.toFixed(2)} ${selectedTranslations.currency}`
        setCost(costText);
    }

    function getReadingCurrent(counter: any): string | number {
        let rading = '0';
        if (counter.closestReading && counter.closestReading.data) {
            rading = counter.closestReading.data;
        }
        return rading;
    }

    function openMoreInfo() {
        setIsShowMoreInfo(!isShowMoreInfo);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    /** Преобразование массива объектов для сохранения */
    function getArrayForSaving(): { date: string, meterReadings: string, idAddress: string } {
        const currentDate = new Date().toString();
        const newArray = countersData.map(item => {
            const meterReading: any = { currentReading: item.closestReading.data };
            const closestReading = Number(item.closestReading.data);
            let previousReading = 0;
            if (item.previousReading && item.previousReading.data) {
                previousReading = Number(item.previousReading.data);
            }
            const volume = closestReading - previousReading;
            meterReading.volume = volume.toFixed(3);
            const cost = volume * Number(item.costOfaUnitOfMeasurement);
            meterReading.cost = cost.toFixed(3);
            const countersInfo = item.closestReading ? { nameCounter: item.name, meterReading } : {};
            const meterReadings = countersInfo;
            return meterReadings;
        });
        const data = {
            date: currentDate,
            meterReadings: JSON.stringify(newArray),
            idAddress: address.id.toString(),
        }
        return data;
    }

    /** Сохранить новую запись со значениями счетчиков */
    async function onSave() {
        try {
            setIsLoadingSave(true);
            const arrayData = getArrayForSaving();
            await createMeterCounterRecord(arrayData, () => {
                setTimeout(() => {
                    setIsLoadingSave(false);
                    setBackgroundColorContainerInfo('rgba(0,255,0,0.1))')
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }, 700)
            });
        }
        catch (err) {
            setIsLoadingSave(false);
        }
    }

    /** Отправить данные счетчиков */
    function onSendReadings() {
        if (address) {

            const recipient = address.email;
            const subject = `${selectedTranslations.subjectReadingsEmail} ${address.street} ${address.building} ${address.apartment}`
            const newArray = countersData.map((item1) => {
                const correspondingItem = selectedTranslations.arrayUnitsOfMeasurement.find((item2: any) => item2.name === item1.name);
                if (correspondingItem) {
                    return {
                        nameCounter: correspondingItem.nameCounter,
                        data: item1.closestReading.data,
                    };
                }
                return null; // или верните объект по умолчанию, если не найдено соответствие
            }).filter(Boolean);
            const body = newArray.reduce((acc: any, item) => {
                const dataCounter = `${item?.nameCounter}: ${item?.data}, `
                return acc + dataCounter;
            }, '');
            //await onSave();
            sendEmail(recipient, subject, body, () => {
                const info = `${selectedTranslations.messageErrorSendReadings} ${address?.email}`
                openInfoTool(info)
            });
        }
    }

    function openInfoTool(text: string) {
        setIsOpenInfoTool(true);
        setMessageInfoTool(text);
    }

    function closeInfoTool() {
        setIsOpenInfoTool(false);
        setMessageInfoTool('');
    }

    function openStatisticsInfo() {
        onClikNavigationStatisticScreen();
    }

    function getCounterName(dataCounter: any) {
        let name = dataCounter.name.toString();
        const findCurrentName = selectedTranslations?.arrayUnitsOfMeasurement.find((item: any) => item.name === name);
        name = findCurrentName?.nameCounter;
        return name;
    }

    function getDate() {
        const date = new Date();
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };

        return date.toLocaleDateString(locale, options);
    }

    useEffect(() => {
        getStatistic();
    }, [countersData])

    return (
        <View style={styles.container}>
            <View style={[styles.containerInfo, { backgroundColor: backgroundColorContainerInfo }]}>
                <Text style={[styles.title, colorText]}>{getDate()}</Text>
                {/* Инпуты показаний счетчика */}
                <>
                    {countersData.map((counter: any) => {
                        return (
                            <TextInputWithLabelInside
                                key={counter.name}
                                label={getCounterName(counter)}
                                placeholder={getCounterName(counter)}
                                value={getReadingCurrent(counter)}
                                onClickInput={() => { console.log('onClickInput') }}
                                onChangeText={() => { }}
                            />
                        )
                    })}
                </>
                {/* Примерная стоимость квитанции */}
                <TextInputWithLabelInside
                    label={selectedTranslations.totalCost}
                    placeholder={selectedTranslations.cost}
                    value={cost}
                    onClickInput={() => { }}
                    onChangeText={() => { }}
                />

                <View style={styles.buttonMoreInfo}>
                    {/* Показать подробную статистику */}
                    <ButtonMoreInfo
                        text={selectedTranslations.moreInfo}
                        controlShow={openMoreInfo}
                        isShow={isShowMoreInfo}
                    />
                    {/* Перейти на список квитанций(записей) с графиком */}
                    <ButtonMoreInfo
                        text={selectedTranslations.statistics}
                        controlShow={openStatisticsInfo}
                        isShow={false}
                        isImg={false}
                    />

                </View>
                {isShowMoreInfo ?
                    //Подробный список потребления и стоимости по каждому счетчику из квитанции(записи)
                    <ListInfo countersData={countersData} />
                    : <></>}
            </View>
            {/* Сохранить или отправить */}
            <View style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ButtonSetting text={selectedTranslations.save} onClick={onSave} isLoading={isLoadingSave} sizeLoader={'small'} />
                <Text style={styles.textNameButtonContainer}>{''}</Text>
                <ButtonSetting text={selectedTranslations.send} onClick={onSendReadings} isLoading={isLoadingSend} sizeLoader={'small'} />
            </View>
            {/* Инфотул */}
            <ModalWithChildren
                isVisible={isOpenInfoTool}
                onClose={closeInfoTool}
                childComponent={
                    <Text style={[styles.messageInfoTool]}>{messageInfoTool}</Text>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 170,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
    },
    containerInfo: {
        width: '90%',
        // marginTop: 30,
        // marginBottom: 30,
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
    },
    messageInfoTool: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',
    }
})

export default FormSendAndSaveCountersData;