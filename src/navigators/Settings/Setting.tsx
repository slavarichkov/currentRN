import { useEffect } from 'react';
import { Image, Dimensions, Platform, View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//Контекст
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useGlobal } from '../../contexts/global/GlobalContext';
import { useTranslate } from '../../contexts/translate/TranslateContext';

import AddressSettingScreen from '../../screens/setting/AddressSettingScreen/AddressSettingScreen';
import GlobalSettingScreen from '../../screens/setting/GlobalSettingScreen/GlobalSettingScreen';
import LeftScreen from '../../screens/setting/AddressSettingScreen/components/LeftScreen/LeftScreen';
import RightScreen from '../../screens/setting/AddressSettingScreen/components/RightScreen/RightScreen';

const Tab = createMaterialTopTabNavigator();

const screenWidth = Dimensions.get('window').width * 1;

/** Компонент навигатор настроек */
function SettingNavigator() {

    const { backgroundColor, colorText } = useTheme();
    const { address } = useGlobal();
    const { selectedTranslations } = useTranslate();


    return (
        <View style={[styles.container, backgroundColor]}>
            {/* <Text style={[styles.title, colorText]}>{selectedTranslations.settingsScreen}</Text> */}
            <Tab.Navigator
                initialRouteName={'AddressSetting'} // начальный экран
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
                    initialParams={{ screenNavigator: 'AddressSetting' }}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: '#87CEEB', opacity: 0 }, // Стиль индикатора
                        tabBarLabel: () => null,
                    }}
                />
                <Tab.Screen
                    name={"AddressSetting"}
                    component={AddressSettingScreen}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: 'rgba(39, 186, 227, 1.00)', opacity: 0.5 }, // Стиль индикатора
                        tabBarLabel: ({ color, focused }) => (
                            <Text style={{ color: colorText.color, opacity: focused ? 1 : 0.5, fontSize: 17, fontWeight: 600, }}>
                                {selectedTranslations.addressSetting}
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name={"GlobalSetting"}
                    component={GlobalSettingScreen}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: 'rgba(39, 186, 227, 1.00)', opacity: 0.5 }, // Стиль индикатора
                        tabBarLabel: ({ color, focused }) => (
                            <Text style={{ color: colorText.color, opacity: focused ? 1 : 0.5, fontSize: 17, fontWeight: 600, }}>
                                {selectedTranslations.globalSetting}
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name='RightScreen'
                    component={RightScreen}
                    initialParams={{ screenNavigator: "GlobalSetting" }}
                    options={{
                        tabBarIndicatorStyle: { backgroundColor: 'transparent' }, // Стиль индикатора
                        tabBarLabel: () => null,
                    }}
                />
            </Tab.Navigator>
        </View >
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
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 30,
    },
})

export default SettingNavigator;