import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Dashboard from '../components/Dashboard/Dashboard';
import Profile from '../components/Profile/Profile';

import Agent from '../components/Agent/Agent';
import Buyer from '../components/Buyer/Buyer';
import Supplier from '../components/Supplier/Supplier';

const Tabs = () => {
  const userState = useSelector(state => state.login);
  switch (userState.type) {
    case 'buyer':
      return <BuyerNavigator />;
    case 'agent':
      return <AgentNavigator />;
    case 'supplier':
      return <SupplierNavigator />;
    default:
      return <BuyerNavigator />;
  }
};

export default Tabs;

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName={'Home'}>
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Profile" component={Profile} />
    </HomeStack.Navigator>
  );
}

const AgentNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabelStyle: {color: '#0ea5e9'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Buyer':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Supplier':
              iconName = focused ? 'people' : 'people-outline';
              break;
          }
          return <Icon name={iconName} size={size} color="#0ea5e9" />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Buyer" component={Buyer} />
      <Tab.Screen name="Supplier" component={Supplier} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const SupplierNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabelStyle: {color: '#0ea5e9'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Agents':
              iconName = focused ? 'people' : 'people-outline';
              break;
          }
          return <Icon name={iconName} size={size} color="#0ea5e9" />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Agents" component={Agent} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const BuyerNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabelStyle: {color: '#0ea5e9'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Agents':
              iconName = focused ? 'people' : 'people-outline';
              break;
          }
          return <Icon name={iconName} size={size} color="#0ea5e9" />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Agents" component={Agent} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
