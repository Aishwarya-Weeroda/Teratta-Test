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

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider config={config}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
