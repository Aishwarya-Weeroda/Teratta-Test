import React from 'react';
import {View} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {BuyersData} from '../../data/Users';
import UserList from '../UserList';

export default function Buyers({navigation}) {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header title="Buyers" />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <UserList navigation={navigation} data={BuyersData} />
      </SafeAreaView>
    </View>
  );
}
