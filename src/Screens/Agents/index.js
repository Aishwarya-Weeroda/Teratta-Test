import React, {useEffect} from 'react';
import {View} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import UserList from '../UserList';
import {useSelector, useDispatch} from 'react-redux';
import {getAgents} from '../../Redux/Features/AgentsSlice';

export default function Agents({navigation}) {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const data = useSelector(state => state.agents.agentsData);
  useEffect(() => {
    console.log('data', data);
    dispatch(getAgents());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header title="Agents" />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <UserList navigation={navigation} data={data} />
      </SafeAreaView>
    </View>
  );
}
