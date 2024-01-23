/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TranslateContextProvider } from './src/contexts/translate/TranslateContext';
import { GlobalContextProvider } from './src/contexts/global/GlobalContext';
import { ThemeContextProvider } from './src/contexts/theme/ThemeContext';
import SplashScreen from 'react-native-splash-screen';

import Main from './src/navigators/Main/Main';
import { getSelectedThemeAsyncStore } from './src/utils/db/asyncStorage/AsyncStore';

function App(): React.JSX.Element {

  //Получить тему
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [backgroundColor, setBackgroundColor] = useState<string>('rgb(0,0,0)');
  const [barStyle, setbarStyle] = useState<string>('light-content');
  const [navigatorTheme, setNavigatorTheme] = useState<any>(DefaultTheme);

  useEffect(() => {
    getSelectedThemeAsyncStore().then((theme: 'light' | 'dark') => setTheme(theme))
  }, [])

  useEffect(() => {
    //SplashScreen.hide();
  }, [])

  useEffect(() => {

    let backgroundColor = theme === 'dark' ? "black" : "white";
    let barStale = theme === 'dark' ? "light-content" : "dark-content";
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
              <Main />
            </NavigationContainer>
          </GlobalContextProvider>
        </TranslateContextProvider>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
