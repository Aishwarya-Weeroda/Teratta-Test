import React from 'react';
import {View} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {AgentsData, SuppliersData} from '../../data/Users';
import UserList from '../UserList';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getSupplier} from '../../Redux/Features/AgentsSlice';

export default function Suppliers({navigation}) {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const data = useSelector(state => state.agents.suppliers);
  useEffect(() => {
    dispatch(getSupplier());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header title="Suppliers" />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <UserList navigation={navigation} data={data} />
      </SafeAreaView>
    </View>
  );
}
