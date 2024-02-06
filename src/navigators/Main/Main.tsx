import { Dimensions, Image, LayoutAnimation, Keyboard, StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//Контекст
import { useTranslate } from '../../contexts/translate/TranslateContext';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useGlobal } from '../../contexts/global/GlobalContext';

import imgHome from '../../../images/home-1-svgrepo-com.png';
import imgAccount from '../../../images/personal.png';
import imgSetting from '../../../images/setting-svgrepo-com.png'
import imgInfo from '../../../images/info-svgrepo-com.png';
import imgChat from '../../../images/list-center-svgrepo-com.png';

import CountersNavigator from '../CountersNavigator/CountersNavigator';
import SettingNavigator from '../Settings/Setting';
import LoadingScreen from '../../componentsShared/loaders/LoadingScreen';
import { useEffect, useState } from 'react';

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
function Main() {

    const Tab = createBottomTabNavigator();
    const screenWidth = Dimensions.get('window').width;
    const insets = useSafeAreaInsets();
    //Контекст
    const { selectedTranslations } = useTranslate();
    const { backgroundColor, theme } = useTheme();
    const { statusAuthLoading } = useGlobal();

    const [isShow, setIsShow] = useState<boolean>(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const activeTintColor = theme === 'light' ? '#000000' : '#ffffff';
    const tintColor = theme === 'light' ? '#000000' : 'rgba(255, 255, 255,0.5)';

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setIsShow(statusAuthLoading && statusAuthLoading === 'completed')
    }, [statusAuthLoading])

    return (
        <View style={[styles.container, backgroundColor]}>
            {!isShow ?
                <Tab.Navigator
                    initialRouteName="CountersScreen" // начальный экран
                    screenOptions={{
                        tabBarLabel: () => null, // Скрыть название вкладки
                        tabBarStyle: {
                            opacity: keyboardOpen && Platform.OS === 'android' ? 0 : 1, //
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
                        tabBarActiveTintColor: activeTintColor,
                        tabBarBackground: () => (
                            <BlurView blurType={theme ? theme : 'light'}
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
                                    style={{ width: 29, height: 29, tintColor: tintColor }}
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
                                    style={{ width: 29, height: 29, tintColor: tintColor }}
                                />
                            ),
                            headerShown: false, // Полностью скрыть верхний заголовок экрана
                        }}
                    />
                </Tab.Navigator>
                :
                <LoadingScreen />
            }

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    }
});

export default Main;