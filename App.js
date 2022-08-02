/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NativeBaseProvider} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/Redux/Store/Store';
import StackNavigation from './src/Navigation/StackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {CustomeToast} from './src/Screens/Toast';
import AppLoading from './src/components/Spinner/Spinner';
import {updateAppState} from './src/Redux/Features/AppSlice';

let persistor = persistStore(store);

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const App = () => {
  const priviousConnectionStatus = state => state.app.isConnected;
  const updateNWState = (isConnected, title, message, type) => {
    store.dispatch(
      updateAppState({
        showToast: true,
        loading: false,
        isConnected,
        title,
        message,
        type,
      }),
    );
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const prevState = priviousConnectionStatus(store.getState());
      if (!prevState && state.isInternetReachable) {
        updateNWState(
          true,
          'Connection Success',
          'Now your devices connected to the internet',
          'success',
        );
      } else if (
        prevState &&
        state.isInternetReachable != null &&
        !state.isInternetReachable
      ) {
        updateNWState(
          false,
          'Connection Error',
          'Ooops! Looks like your devices not connected to the internet',
          'error',
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider config={config}>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
      <CustomeToast />
      <AppLoading />
    </Provider>
  );
};
export default App;
