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
  const datas = useSelector(state => state.agents.agentsData);
  useEffect(() => {
    dispatch(getAgents());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.background, }}>
      <Header style={{ elevation : 2, borderBottomWidth: 3, borderColor: "white", }} title="Agents" />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <UserList navigation={navigation} data={datas} />
      </SafeAreaView>
    </View>
  );
}
