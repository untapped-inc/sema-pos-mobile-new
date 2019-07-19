import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MainNavigator from './src/navigation/MainNavigator';

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
    <PaperProvider theme={theme}>
      <MainNavigator />
    </PaperProvider>
  );
}