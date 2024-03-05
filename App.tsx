/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { TranslateContextProvider } from './src/contexts/translate/TranslateContext';
import { GlobalContextProvider } from './src/contexts/global/GlobalContext';
import { ThemeContextProvider } from './src/contexts/theme/ThemeContext';
import SplashScreen from 'react-native-splash-screen';

import Main from './src/navigators/Main/Main';
import { getSelectedThemeAsyncStore } from './src/utils/db/asyncStorage/AsyncStore';

// Включение поддержки анимации макета на Android, которая позволяет использовать LayoutAnimation для создания анимаций  компонентов при изменении их размеров и расположения. Однако по умолчанию эта функция отключена.
// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

function App(): React.JSX.Element {

  //Получить тему
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [backgroundColor, setBackgroundColor] = useState<string>('rgb(0,0,0)');
  const [barStyle, setbarStyle] = useState<string>('light-content');
  const [navigatorTheme, setNavigatorTheme] = useState<any>(DefaultTheme);

  //Слушать пуш 
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    getSelectedThemeAsyncStore().then((theme: 'light' | 'dark') => setTheme(theme))
  }, [])

  useEffect(() => {
    //SplashScreen.hide();
  }, [])

  useEffect(() => {

    let backgroundColor = theme === 'light' ? "gray" : "gray";
    let barStale = theme === 'light' ? "light-content" : "dark-content";
    setBackgroundColor(backgroundColor);
    setbarStyle(barStale);

    let currentNavigatorTheme = DefaultTheme;
    if (theme === 'dark') {
      currentNavigatorTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#333b42',
        },
      }
    } else {
      currentNavigatorTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'gray',
        },
      }
    }

    setNavigatorTheme(currentNavigatorTheme);

  }, [theme])

  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <TranslateContextProvider>
          <GlobalContextProvider>
            <NavigationContainer theme={navigatorTheme}>
              <StatusBar backgroundColor={theme === 'light' ? 'gray' : '#333b42'} barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
              <Main />
            </NavigationContainer>
          </GlobalContextProvider>
        </TranslateContextProvider>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
