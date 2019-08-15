/* eslint-disable global-require */
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import store from './src/store';
import MainNavigator from './src/navigation/MainNavigator';

const persistor = persistStore(store);

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2858a7',
    accent: '#ABC1DE'
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };

    this._loadAssetsAsync = this._loadAssetsAsync.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  _cacheAssets(assets) {
    return assets.map(asset => Asset.fromModule(asset).downloadAsync());
  }

  async _loadAssetsAsync() {
    const allAssets = this._cacheAssets([
      require('./assets/swe-logo.png'),
    ]);

    await Promise.all([...allAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          // eslint-disable-next-line no-console
          onError={console.warn}
        />
      );
    }

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
}
