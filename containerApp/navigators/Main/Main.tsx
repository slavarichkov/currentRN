/**
 * Главный компонент - точка входа приложения, управляющий навигацией и скринами.
 *
 * @component
 * @example
 * import MainApp from './MainApp';
 * <MainApp />
 *
 * @returns {React.Component} Главный компонент приложения.
 */

import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//Контекст
import { useTranslate } from '../../contexts/translate/TranslateContext';

import imgHome from '../../../images/home-1-svgrepo-com.png';
import imgAccount from '../../../images/personal.png';
import imgInfo from '../../../images/info-svgrepo-com.png';
import imgChat from '../../../images/list-center-svgrepo-com.png';

import CountersNavigator from '../CountersNavigator';

function Main() {

    const Tab = createBottomTabNavigator();
    const screenWidth = Dimensions.get('window').width;
    const insets = useSafeAreaInsets();
    //Перевод
    const { selectedTranslations } = useTranslate();

    return (
        <View style={styles.container}>
            <Tab.Navigator
                initialRouteName="CountersScreen" // начальный экран
                screenOptions={{
                    tabBarLabel: () => null, // Скрыть название вкладки
                    tabBarStyle: {
                        width: screenWidth, // Ширина на весь экран
                        position: 'absolute',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        borderWidth: 0,
                        paddingTop: 10,
                        paddingBottom: insets.bottom,
                        overflow: 'hidden',
                        borderTopWidth: 0, // Устанавливаем толщину верхней границы в 0, чтобы убрать рамку
                        elevation: 0, // Устанавливаем тень в 0, чтобы убрать тень (для Android)
                    },
                    tabBarActiveTintColor: '#000000',
                    tabBarBackground: () => (
                        <BlurView blurType={'light'}
                            blurAmount={10}
                            style={{
                                ...StyleSheet.absoluteFill,
                                backgroundColor: 'transparent',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                overflow: 'hidden',
                            }} />
                    ),
                }}
            >
                <Tab.Screen
                    name="CountersScreen"
                    component={CountersNavigator}
                    options={{
                        tabBarLabel: selectedTranslations.nameMainScren,
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={imgHome}
                                style={{ width: 29, height: 29, tintColor: 'rgba(0,0,0,0.5)' }}
                            />
                        ),
                        headerShown: false, // Полностью скрыть верхний заголовок экрана
                    }}
                />
                <Tab.Screen
                    name="CountersScreen2"
                    component={CountersNavigator}
                    options={{
                        tabBarLabel: selectedTranslations.nameMainScren,
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={imgAccount}
                                style={{ width: 29, height: 29, tintColor: 'rgba(0,0,0,0.5)' }}
                            />
                        ),
                        headerShown: false, // Полностью скрыть верхний заголовок экрана
                    }}
                />
                <Tab.Screen
                    name="CountersScreen3"
                    component={CountersNavigator}
                    options={{
                        tabBarLabel: selectedTranslations.nameMainScren,
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={imgChat}
                                style={{ width: 29, height: 29, tintColor: 'rgba(0,0,0,0.5)' }}
                            />
                        ),
                        headerShown: false, // Полностью скрыть верхний заголовок экрана
                    }}
                />
                <Tab.Screen
                    name="CountersScreen4"
                    component={CountersNavigator}
                    options={{
                        tabBarLabel: selectedTranslations.nameMainScren,
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={imgInfo}
                                style={{ width: 29, height: 29, tintColor: 'rgba(0,0,0,0.5)' }}
                            />
                        ),
                        headerShown: false, // Полностью скрыть верхний заголовок экрана
                    }}
                />
            </Tab.Navigator>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 50,
    }
});

export default Main;