import React, {useEffect, useState} from 'react';
import {useTheme} from '../../config';
import Search from '../../component/Search';
import Header from '../../component/Header/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');
import SentRFQ from '../../Screens/SentRFQ';
import AgentEnqs from '../AgentEnqs';

const AgentTopTab = createMaterialTopTabNavigator();
const AgentTopTabBar = ({initialRouteName}) => {
  const {colors} = useTheme();
  return (
    <AgentTopTab.Navigator
      initialRouteName={initialRouteName}
      style={{borderColor: 'red'}}
      screenOptions={{
        tabBarStyle: {
          borderBottomWidth: 0.7,
          borderColor: colors.border,
          elevation: 2,
        },
        tabBarItemStyle: {width: width / 2},
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <AgentTopTab.Screen name="Enquiry" component={AgentEnqs} />
      <AgentTopTab.Screen name="RFQ" component={SentRFQ} />
    </AgentTopTab.Navigator>
  );
};

const AgentHome = ({navigation, route}) => {
  const {colors} = useTheme();
  const [activeTab, setActiveTab] = useState('Enquiry');
  const initialRouteName = route.params?.tab;
  useEffect(() => {
    setActiveTab(initialRouteName);
  }, [initialRouteName]);
  console.log('initialRouteName', initialRouteName);
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <Header
          title="Enquiry & RFQ"
          style={{borderColor: colors.border}}
          renderRight={() => (
            <Icon name="funnel-outline" color={colors.primary} size={20} />
          )}
          onPressRight={() => navigation.navigate('Filter')}
        />
        <Search />
        <View style={{flex: 8}}>
          <AgentTopTabBar initialRouteName={activeTab} />
        </View>
      </View>
    </>
  );
};
export default AgentHome;
