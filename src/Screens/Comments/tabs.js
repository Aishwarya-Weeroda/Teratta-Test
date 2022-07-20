import React from 'react';
import {useTheme} from '../../config';
import styles from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Messages from '../Messages/Messages';

const Tabs = ({tabs, activeTab, callback}) => {
  const TopTab = createMaterialTopTabNavigator();
  const {colors} = useTheme();
  return (
    <TopTab.Navigator
      initialRouteName={activeTab}
      screenOptions={{
        lazy: true,
        tabBarStyle: {
          borderWidth: 0.7,
          borderColor: colors.border,
          ...styles.topTabBarStyle,
        },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      {tabs?.map(t => (
        <TopTab.Screen key={t.name} name={t.name}>
          {props => (
            <Messages
              {...props}
              messages={t.messages}
              id={t.id}
              callback={callback}
            />
          )}
        </TopTab.Screen>
      ))}
    </TopTab.Navigator>
  );
};
export default Tabs;
