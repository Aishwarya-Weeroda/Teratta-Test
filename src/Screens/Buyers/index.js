import React from 'react';
import {View} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {BuyersData} from '../../data/Users';
import UserList from '../UserList';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import {getAgents, getBuyers} from '../../Redux/Features/AgentsSlice';

export default function Buyers({navigation}) {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const data = useSelector(state => state.agents.buyers);
  useEffect(() => {
    dispatch(getBuyers());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header title="Buyers" />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <UserList navigation={navigation} data={data} />
      </SafeAreaView>
    </View>
  );
}
