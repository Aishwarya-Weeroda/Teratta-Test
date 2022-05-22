import React from 'react';
import {Input, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBar() {
  return (
    <Input
      placeholder="Search"
      variant="filled"
      width="100%"
      height="8"
      borderRadius="10"
      borderColor="#64748b"
      py="1"
      px="2"
      borderWidth="0"
      InputLeftElement={
        <Icon
          ml="2"
          size="4"
          color="#64748b"
          as={<Ionicons name="ios-search" color="#64748b" />}
        />
      }
    />
  );
}
