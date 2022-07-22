/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

let persistor = persistStore(store);

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const App = () => {
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
