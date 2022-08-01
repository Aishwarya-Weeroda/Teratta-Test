import React from 'react';
import {useTheme} from '../../config';
import Search from '../../component/Search';
import Header from '../../component/Header/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');
import SentRFQ from '../../Screens/SentRFQ';
import RFQs from '../../Screens/RFQs';

const AgentTopTab = createMaterialTopTabNavigator();
const AgentTopTabBar = () => {
  const {colors} = useTheme();
  return (
    <AgentTopTab.Navigator
      initialRouteName="EnquiryList"
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
      <AgentTopTab.Screen name="Enquiry" component={RFQs} />
      <AgentTopTab.Screen name="RFQ" component={SentRFQ} />
    </AgentTopTab.Navigator>
  );
};

const AgentHome = ({navigation}) => {
  const {colors} = useTheme();
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
          <AgentTopTabBar />
        </View>
      </View>
    </>
  );
};
export default AgentHome;
