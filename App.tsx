/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { TranslateContextProvider } from './containerApp/contexts/translate/TranslateContext';
import { GlobalContextProvider } from './containerApp/contexts/global/GlobalContext';
import { ThemeContextProvider } from './containerApp/contexts/theme/ThemeContext';

import Main from './containerApp/navigators/Main/Main';

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ThemeContextProvider>
          <TranslateContextProvider>
            <GlobalContextProvider>
              <Main />
            </GlobalContextProvider>
          </TranslateContextProvider>
        </ThemeContextProvider>
      </SafeAreaProvider>
    </NavigationContainer>
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
