import { Image, Dimensions, Platform, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import WaterCounetrsScreen from '../screens/counters/WaterCounetrsScreen/WaterCounetrsScreen';

import imgWater from '../../images/drop-svgrepo-com.png';
import imgElectrocity from '../../images/electricity-svgrepo-com.png';
import imgHeat from '../../images/radiators-heat-svgrepo-com.png';
import imgGas from '../../images/gas-burner-svgrepo-com.png';

const Tab = createMaterialTopTabNavigator();

const screenWidth = Dimensions.get('window').width;

function CountersNavigator() {
    return (
        <Tab.Navigator
            initialRouteName={'1'} // начальный экран
            screenOptions={{
                tabBarLabelStyle: { fontSize: 17 },
                tabBarStyle: {
                    width: screenWidth, // Ширина на весь экран
                    //backgroundColor: backgroundColor,
                },
                //tabBarActiveTintColor: activeTintColor,
            }}
            tabBarShowIcon={true}
        >
            <Tab.Screen
                name='Water'
                component={WaterCounetrsScreen}
                options={{
                    //tabBarIndicatorStyle: { backgroundColor: theme === 'light' ? 'rgba(0,0,0,.3)' : 'rgba(255,255,255,0.17)' }, // Стиль индикатора
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
            <Tab.Screen
                name='Electrocity'
                component={WaterCounetrsScreen}
                options={{
                    //tabBarIndicatorStyle: { backgroundColor: theme === 'light' ? 'rgba(0,0,0,.3)' : 'rgba(255,255,255,0.17)' }, // Стиль индикатора
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
                component={WaterCounetrsScreen}
                options={{
                    //tabBarIndicatorStyle: { backgroundColor: theme === 'light' ? 'rgba(0,0,0,.3)' : 'rgba(255,255,255,0.17)' }, // Стиль индикатора
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color }) => (
                        <>
                            <Image
                                source={imgHeat} // Указываем путь к PNG-изображению
                                style={{ width: 28, height: 28, tintColor: 'gray' }} // Устанавливаем размер и цвет
                            />

                        </>
                    ),
                }}
            />
            <Tab.Screen
                name='Gas'
                component={WaterCounetrsScreen}
                options={{
                    tabBarIndicatorStyle: { backgroundColor: 'black' }, // Стиль индикатора
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
            />
        </Tab.Navigator>
    )

}

export default CountersNavigator;