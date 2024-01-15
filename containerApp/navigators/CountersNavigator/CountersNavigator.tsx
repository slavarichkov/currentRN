import { Image, Dimensions, Platform, View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//Контекст
import { useTheme } from '../../contexts/theme/ThemeContext';

import WaterCounetrsScreen from '../../screens/counters/WaterCounetrsScreen/WaterCounetrsScreen';
import TextCountersInfo from '../../componentsShared/textCountersInfo/TextCountersInfo';

import imgWater from '../../../images/drop-svgrepo-com.png';
import imgElectrocity from '../../../images/electricity-svgrepo-com.png';
import imgHeat from '../../../images/radiators-heat-svgrepo-com.png';
import imgGas from '../../../images/gas-burner-svgrepo-com.png';

import { openOrCreateDatabase } from '../../utils/db/SQLite/dbCounters';
import { openOrCreateDatabaseMeterCounterRecord } from '../../utils/db/SQLite/dbCountersReading';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

const screenWidth = Dimensions.get('window').width * 1;

function CountersNavigator() {

    const { backgroundColor } = useTheme();

    function LeftComponent() {
        return (<></>)
    }

    function RightComponent() {
        return (<></>)
    }

    useEffect(() => {
        openOrCreateDatabase(() => { }, () => { });
        openOrCreateDatabaseMeterCounterRecord(() => { }, () => { })
    }, [])

    return (
        <View style={[styles.container, backgroundColor]}>
            <View style={styles.text}>
                <TextCountersInfo />
            </View>
            <Tab.Navigator
                initialRouteName={'Water'} // начальный экран
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 17 },
                    tabBarStyle: {
                        width: screenWidth, // Ширина на весь экран
                        backgroundColor: backgroundColor,
                    },
                }}
            >
                <Tab.Screen
                    name='Water1'
                    component={LeftComponent}
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
                <Tab.Screen
                    name='Water'
                    component={WaterCounetrsScreen}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: '#87CEEB', opacity: 0.5 }, // Стиль индикатора
                        tabBarLabel: () => null,
                        tabBarIcon: ({ color }) => (
                            <>
                                <Image
                                    source={imgWater} // Указываем путь к PNG-изображению
                                    style={{ width: 28, height: 28, tintColor: '#87CEEB' }} // Устанавливаем размер и цвет
                                />

                            </>
                        ),
                    }}
                />
                {/* <Tab.Screen
                    name='Electrocity'
                    component={<></>}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: 'yellow', opacity: 0.5 }, // Стиль индикатора
                        tabBarLabel: () => null,
                        tabBarIcon: ({ color }) => (
                            <>
                                <Image
                                    source={imgElectrocity} // Указываем путь к PNG-изображению
                                    style={{ width: 28, height: 28, tintColor: 'yellow' }} // Устанавливаем размер и цвет
                                />

                            </>
                        ),
                    }}
                />
                <Tab.Screen
                    name='Heat'
                    component={<></>}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: 'black', opacity: 0.5 }, // Стиль индикатора
                        tabBarLabel: () => null,
                        tabBarIcon: ({ color }) => (
                            <>
                                <Image
                                    source={imgHeat} // Указываем путь к PNG-изображению
                                    style={{ width: 28, height: 28, tintColor: 'black' }} // Устанавливаем размер и цвет
                                />

                            </>
                        ),
                    }}
                />
                <Tab.Screen
                    name='Gas'
                    component={<></>}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: 'blue', opacity: 0.5 }, // Стиль индикатора
                        tabBarLabel: () => null,
                        tabBarIcon: ({ color }) => (
                            <>
                                <Image
                                    source={imgGas} // Указываем путь к PNG-изображению
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: 'blue',
                                    }} // Устанавливаем размер и цвет
                                />

                            </>
                        ),
                    }}
                /> */}
                <Tab.Screen
                    name='Water2'
                    component={RightComponent}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: 'transparent' }, // Стиль индикатора
                        tabBarLabel: () => null,
                    }}
                />
            </Tab.Navigator>
        </View>
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