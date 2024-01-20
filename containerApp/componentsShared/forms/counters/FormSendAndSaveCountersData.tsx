import { useEffect, useState } from "react"
import { LayoutAnimation, StyleSheet, Text, View } from "react-native"
import { useTranslate } from '../../../contexts/translate/TranslateContext';
import { useGlobal } from '../../../contexts/global/GlobalContext';
import { TypeCounterInfo } from "../../../screens/counters/types/types";
import { createMeterCounterRecord } from "../../../utils/db/SQLite/dbMeterReadingSubmission";
import ListInfo from "../../../screens/counters/CountersInfoScreen/components/ListInfo";
import TextInputWithLabelInside from "../../Inputs/TextInputWithLabelInside"
import ButtonSetting from "../../../screens/setting/GlobalSettingScreen/components/ButtonSetting";
import ButtonMoreInfo from "../../buttons/ButtonMoreInfo";

interface TypeCounterData extends TypeCounterInfo {
    closestReading?: { key: string; value: string };
    previousReading?: { key: string; value: string };
}
interface FormSendAndSaveCountersDataProps {
    countersData: any[]; // Подставьте тип для countersData
}

const FormSendAndSaveCountersData: React.FC<FormSendAndSaveCountersDataProps> = ({ countersData }) => {

    const { selectedTranslations } = useTranslate();
    const { address } = useGlobal();

    const arrayCountersObj = [
        { nameCounter: 'Холодная вода', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Горячая вода', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Электричество', data: 'Данные счетчика', date: new Date().toString() },
        { nameCounter: 'Отопление', data: 'Данные счетчика', date: new Date().toString() },
        { nameScreen: 'Gas', nameCounter: 'Газ', data: 'Данные счетчика', date: new Date().toString() },
    ]

    const [currents, setCurrents] = useState<any>(arrayCountersObj)
    const [statistic, setStatistic] = useState<any>([]);
    const [cost, setCost] = useState<string>('0');
    const [backgroundColorContainerInfo, setBackgroundColorContainerInfo] = useState(`backgroundColor: 'rgba(0,0,0,0.1)`)
    const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);
    //Лоадеры
    const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
    const [isLoadingSend, setIsLoadingSend] = useState<boolean>(false);

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
                if (data && data.closestReading && data.closestReading.data && data.previousReading && data.previousReading.data) {
                    const closestReading = Number(data.closestReading.data);
                    const previousReading = Number(data.previousReading.data);
                    const volume = closestReading - previousReading;
                    statisticObj.volume = volume.toString();
                    const cost = volume * Number(data.costOfaUnitOfMeasurement);
                    statisticObj.cost = cost.toString();
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
        let costText = `${costValue.toString()} ${selectedTranslations.currency}`
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
            const previousReading = Number(item.previousReading.data);
            const volume = closestReading - previousReading;
            meterReading.volume = volume.toString();
            const cost = volume * Number(item.costOfaUnitOfMeasurement);
            meterReading.cost = cost.toString();
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

    useEffect(() => {
        getStatistic();
    }, [countersData])

    return (
        <View style={styles.container}>
            <View style={[styles.containerInfo, { backgroundColor: backgroundColorContainerInfo }]}>
                <>
                    {countersData.map((counter: any) => {
                        return (
                            <TextInputWithLabelInside
                                key={counter.name}
                                label={counter.name ? counter.name : ''}
                                placeholder={counter.name}
                                value={getReadingCurrent(counter)}
                                onClickInput={() => { console.log('onClickInput') }}
                                onChangeText={() => { }}
                            />
                        )
                    })}
                </>
                <TextInputWithLabelInside
                    label={selectedTranslations.totalCost}
                    placeholder={selectedTranslations.cost}
                    value={cost}
                    onClickInput={() => { }}
                    onChangeText={() => { }}
                />
                <View style={styles.buttonMoreInfo}>
                    <ButtonMoreInfo
                        text={selectedTranslations.moreInfo}
                        controlShow={openMoreInfo}
                        isShow={isShowMoreInfo}
                    />
                </View>
                {isShowMoreInfo ?
                    <ListInfo countersData={countersData} />
                    : <></>}
            </View>
            {/* Сохранить или отправить */}
            <View style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ButtonSetting text={selectedTranslations.save} onClick={onSave} isLoading={isLoadingSave} sizeLoader={'small'} />
                <Text style={styles.textNameButtonContainer}>{''}</Text>
                <ButtonSetting text={selectedTranslations.send} onClick={() => { }} isLoading={isLoadingSend} sizeLoader={'small'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 170,
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
        width: 138,
    }
})

export default FormSendAndSaveCountersData;