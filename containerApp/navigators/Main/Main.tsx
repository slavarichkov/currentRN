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

import CountersScreen from '../../screens/counters/CountersScreen';

function Main() {

    const Tab = createBottomTabNavigator();
    const screenWidth = Dimensions.get('window').width;
    const insets = useSafeAreaInsets();

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
                    //tabBarActiveTintColor: activeTintColor,
                    //showLabel: true,
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
            //tabBarShowIcon={true}
            // options={{
            //     tabBarLabel: () => null, // или tabBarLabel: () => '',
            // }}
            // bounces={false}
            >
                <Tab.Screen
                    name="CountersScreen"
                    component={CountersScreen}
                    options={{
                        //id: 'countersscreen',
                        tabBarLabel: 'CountersScreen',
                        tabBarIcon: ({ color }) => (
                            <Image
                                //source={imgButtonHome}
                                style={{ width: 29, height: 29, tintColor: color }}
                            />
                        ),
                        headerShown: false, // Полностью скрыть верхний заголовок экрана
                        //animationTypeForReplace: 'push', // Тип анимации при замене экрана
                        //animationTypeForPush: 'push', // Тип анимации при переходе на этот экран
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
    }
});

export default Main;