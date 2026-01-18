import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  console.log('App component rendering...');

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <ThemeProvider>
            <PaperProvider theme={DefaultTheme}>
              <NavigationContainer>
                <StatusBar style="dark" />
                <AppNavigator />
              </NavigationContainer>
            </PaperProvider>
          </ThemeProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
