/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Link,
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  VStack,
  Box,
} from 'native-base';
import NativeBaseIcon from './src/components/NativeBaseIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const App = () => {
  return (
    <NativeBaseProvider config={config}>
      <Center
        _dark={{bg: 'blueGray.900'}}
        _light={{bg: 'blueGray.50'}}
        px={4}
        flex={1}>
        <Icon name="rocket" size={30} color="#900" />
        <Box
          bg={{
            linearGradient: {
              colors: ['lightBlue.300', 'violet.800'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          p={12}
          rounded="lg"
          _text={{
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
          }}>
          This is a Box with Linear Gradient
        </Box>
        ;
      </Center>
    </NativeBaseProvider>
  );
};
export default App;
