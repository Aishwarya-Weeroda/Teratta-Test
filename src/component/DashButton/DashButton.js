import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Stack, Center, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

const DashButton = ({style}) => {
  return (
    <Stack space={3} alignItems="center">
      <HStack space={3} alignItems="center">
        <TouchableOpacity>
          <Center
            size={20}
            bg={{
              linearGradient: {
                colors: ['#ffafbd', '#ffc3a0'],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            rounded="md"
            _text={{
              color: 'white',
            }}
            shadow={3}>
            <Icon name="md-today-outline" size={22} color="#fff" />
            Today
          </Center>
        </TouchableOpacity>
        <TouchableOpacity>
          <Center
            bg={{
              linearGradient: {
                colors: ['#2193b0', '#6dd5ed'],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            size={20}
            rounded="md"
            _text={{
              color: 'white',
            }}
            shadow={3}>
            <FontIcon name="calendar-week" size={22} color="#fff" />
            This Week
          </Center>
        </TouchableOpacity>
        <TouchableOpacity>
          <Center
            size={20}
            bg={{
              linearGradient: {
                colors: ['#BBD2C5', '#536976'],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            rounded="md"
            _text={{
              color: 'white',
            }}
            shadow={3}>
            <FontIcon name="calendar-alt" size={22} color="#fff" />
            this Month
          </Center>
        </TouchableOpacity>
        <TouchableOpacity>
          <Center
            size={20}
            bg={{
              linearGradient: {
                colors: ['#ec008c', '#fc6767'],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            rounded="md"
            _text={{
              color: 'white',
            }}
            shadow={3}>
            <FontIcon name="business-time" size={22} color="#fff" />
            This Year
          </Center>
        </TouchableOpacity>
      </HStack>
    </Stack>
  );
};
export default DashButton;
