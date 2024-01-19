import { Image, Dimensions, Platform, View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//Контекст
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useGlobal } from '../../contexts/global/GlobalContext';

import ColdWaterCounetrsScreen from '../../screens/counters/ColdWaterCounetrsScreen/ColdWaterCounetrsScreen';
import HotWaterCounetrsScreen from '../../screens/counters/HotWaterCounetrsScreen/HotWaterCounetrsScreen';
import ElectrocityCounetrsScreen from '../../screens/counters/ElectrocityCounetrsScreen/ElectrocityCounetrsScreenCounetrsScreen';
import HeatCounterScreen from '../../screens/counters/HeatCounterScreen/HeatCounterScreen';
import GasCounterScreen from '../../screens/counters/GasCounterScreen/GasCounterScreen';
import LeftScreen from '../../screens/counters/LeftScreen/LeftScreen';
import RightScreen from '../../screens/counters/RightScreen/RightScreen';
import TextCountersInfo from '../../componentsShared/textCountersInfo/TextCountersInfo';

import imgWater from '../../../images/drop-svgrepo-com.png';
import imgElectrocity from '../../../images/electricity-svgrepo-com.png';
import imgHeat from '../../../images/radiators-heat-svgrepo-com.png';
import imgGas from '../../../images/gas-burner-svgrepo-com.png';

import { openOrCreateDatabase } from '../../utils/db/SQLite/dbCounters';
import { openOrCreateDatabaseMeterCounterRecord } from '../../utils/db/SQLite/dbCountersReading';
import { useEffect, useState } from 'react';

const Tab = createMaterialTopTabNavigator();

const screenWidth = Dimensions.get('window').width * 1;

function CountersNavigator() {

    const { backgroundColor } = useTheme();
    const { address } = useGlobal();

    type CounterComponent = React.ComponentType<any>; // Здесь уточните тип props, если это возможно

    type CounterObject = {
        nameScreen: string;
        nameCounter: string;
        component: CounterComponent;
    };

    const arrayCountersObj = [
        { nameScreen: 'ColdWater', nameCounter: 'Холодная вода', component: ColdWaterCounetrsScreen, colorIndicator: '#87CEEB', img: imgWater },
        { nameScreen: 'HotWater', nameCounter: 'Горячая вода', component: HotWaterCounetrsScreen, colorIndicator: 'rgba(255,0,0,0.5)', img: imgWater },
        { nameScreen: 'Electrocity', nameCounter: 'Электричество', component: ElectrocityCounetrsScreen, colorIndicator: 'yellow', img: imgElectrocity },
        { nameScreen: 'Heat', nameCounter: 'Отопление', component: HeatCounterScreen, colorIndicator: 'black', img: imgHeat },
        { nameScreen: 'Gas', nameCounter: 'Газ', component: GasCounterScreen, colorIndicator: 'blue', img: imgGas },
    ]

    const [listCounters, setListCounters] = useState<string[]>(['Холодная вода', 'Горячая вода', 'Электричество', 'Отопление', 'Газ']);
    const [arrayCounters, setArrayCounters] = useState<CounterObject[]>(arrayCountersObj);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    useEffect(() => {
        openOrCreateDatabase(() => { }, () => { });
        openOrCreateDatabaseMeterCounterRecord(() => { }, () => { })
    }, [])

    async function getNavigation() {
        if (address && address.arrayCountersName) {
            setIsLoad(false);
            const array = JSON.parse(address.arrayCountersName);
            setListCounters(array);

            const filtredArray = await arrayCountersObj.filter((obj) => array.includes(obj.nameCounter));

            // Вызываем setArrayCounters только после завершения фильтрации
            setArrayCounters(filtredArray);
            setIsLoad(true);
        }
    }


    useEffect(() => {
        getNavigation();
    }, [address])

    return (
        isLoad ?
            <View style={[styles.container, backgroundColor]}>
                <View style={styles.text}>
                    <TextCountersInfo />
                </View>
                <Tab.Navigator
                    initialRouteName={arrayCounters[0].nameScreen} // начальный экран
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 17 },
                        tabBarStyle: {
                            width: screenWidth, // Ширина на весь экран
                            backgroundColor: backgroundColor,
                        },
                    }}
                >
                    <Tab.Screen
                        name='LeftScreen'
                        component={LeftScreen}
                        initialParams={{ screenNavigator: arrayCounters[0].nameScreen }}
                        options={{
                            tabBarIndicatorStyle: { backgroundColor: '#87CEEB', opacity: 0 }, // Стиль индикатора
                            tabBarLabel: () => null,
                            tabBarIcon: ({ color }) => (
                                <>
                                    {/* <Image
                                    source={imgWater} // Указываем путь к PNG-изображению
                                    style={{ width: 28, height: 28, tintColor: '#87CEEB' }} // Устанавливаем размер и цвет
                                /> */}

                                </>
                            ),
                        }}
                    />
                    {arrayCounters.map((counterObj) => {
                        return (
                            <Tab.Screen
                                key={counterObj.nameScreen}
                                name={counterObj.nameScreen}
                                component={counterObj.component}
                                options={{
                                    tabBarIndicatorStyle: { backgroundColor: counterObj.colorIndicator, opacity: 0.5 }, // Стиль индикатора
                                    tabBarLabel: () => null,
                                    tabBarIcon: ({ color }) => (
                                        <>
                                            <Image
                                                source={counterObj.img} // Указываем путь к PNG-изображению
                                                style={{ width: 28, height: 28, tintColor: counterObj.colorIndicator }} // Устанавливаем размер и цвет
                                            />

                                        </>
                                    ),
                                }}
                            />
                        )

                    })}
                    <Tab.Screen
                        name='RightScreen'
                        component={RightScreen}
                        initialParams={{ screenNavigator: arrayCounters[arrayCounters.length - 1].nameScreen }}
                        options={{
                            tabBarIndicatorStyle: { backgroundColor: 'transparent' }, // Стиль индикатора
                            tabBarLabel: () => null,
                        }}
                    />
                </Tab.Navigator>
            </View>
            : <></>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        //position: 'absolute',
        height: '10%',
        top: 35,
    }
})

export default CountersNavigator;