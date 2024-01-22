import { useEffect, useState } from "react"
import { LayoutAnimation, StyleSheet, Text, View } from "react-native"
import { useTranslate } from '../../../../contexts/translate/TranslateContext';
import { useGlobal } from '../../../../contexts/global/GlobalContext';
import { TypeCounterInfo } from "../../../../screens/counters/types/types";
import { createMeterCounterRecord } from "../../../../utils/db/SQLite/dbMeterReadingSubmission";
import ListInfo from "../../../../screens/counters/CountersInfoScreen/components/ListInfo";
import TextInputWithLabelInside from "../../../Inputs/TextInputWithLabelInside"
import ButtonSetting from "../../../../screens/setting/GlobalSettingScreen/components/ButtonSetting";
import ButtonMoreInfo from "../../../buttons/ButtonMoreInfo";


const infoReadings = ({countersData}) => {

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
                    console.log(data.previousReading)
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

    function openStatisticsInfo() {
        onClikNavigationStatisticScreen();
    }


    return (
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
                <ButtonMoreInfo
                    text={selectedTranslations.statistics}
                    controlShow={openStatisticsInfo}
                    isShow={false}
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
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})

export default infoReadings;