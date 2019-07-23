import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from './src/store';
import MainNavigator from './src/navigation/MainNavigator';

const persistor = persistStore(store);

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2858a7',
    accent: '#ABC1DE'
  },
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <MainNavigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}