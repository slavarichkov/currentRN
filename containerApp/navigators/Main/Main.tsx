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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//Контекст
import { useTranslate } from '../../contexts/translate/TranslateContext';
import { useTheme } from '../../contexts/theme/ThemeContext';

import imgHome from '../../../images/home-1-svgrepo-com.png';
import imgAccount from '../../../images/personal.png';
import imgSetting from '../../../images/setting-svgrepo-com.png'
import imgInfo from '../../../images/info-svgrepo-com.png';
import imgChat from '../../../images/list-center-svgrepo-com.png';

import CountersNavigator from '../CountersNavigator/CountersNavigator';
import SettingNavigator from '../Settings/Setting';

function Main() {

    const Tab = createBottomTabNavigator();
    const screenWidth = Dimensions.get('window').width;
    const insets = useSafeAreaInsets();
    //Контекст
    const { selectedTranslations } = useTranslate();
    const { backgroundColor } = useTheme();

    return (
        <View style={[styles.container, backgroundColor]}>
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
                        tabBarLabel: selectedTranslations.countersScreen,
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
                    name="Settings"
                    component={SettingNavigator}
                    options={{
                        tabBarLabel: selectedTranslations.settingsScreen,
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={imgSetting}
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