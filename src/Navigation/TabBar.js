import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

// import Profile from '../components/Profile/Profile';
import Agent from '../components/Agent/Agent';
import Buyer from '../components/Buyer/Buyer';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
const Tab = createBottomTabNavigator();

const CustomTabBar = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...Style.shdow,
    }}
    onPress={onPress}>
    <LinearGradient
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        backgroundColor: '#e32f45',
      }}
      colors={['#02aab0', '#00cdac']}>
      {/* <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          overflow: 'hidden',
          backgroundColor: '#e32f45',
        }}> */}
      {children}
      {/* </View> */}
    </LinearGradient>
  </TouchableOpacity>
);

const Style = StyleSheet.create({
  shdow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

const opt = {
  tabBarShowLabel: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backGroundColor: '#fffffff',
    borderRadius: 15,
    height: 90,
    ...Style.shdow,
  },
};

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        ...opt,
        // tabBarIcon: ({focused, color, size}) => {
        //   return <Icon name="home-outline" size={size} color="#0ea5e9" />;
        // },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={focused ? '#02aab0' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#02aab0' : '#748c94', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Buyer"
        component={Buyer}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon
                name={focused ? 'ios-people' : 'ios-people-outline'}
                size={size}
                color={focused ? '#02aab0' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#02aab0' : '#748c94', fontSize: 12}}>
                Agents
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Enqury"
        component={Agent}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Icon
              name={focused ? 'add-outline' : 'add-outline'}
              size={size}
              color="#fff"
            />
          ),
          tabBarButton: props => <CustomTabBar {...props} />,
        }}
      />
      <Tab.Screen
        name="Agent"
        component={Agent}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon
                name={focused ? 'cart' : 'cart-outline'}
                size={size}
                color={focused ? '#02aab0' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#02aab0' : '#748c94', fontSize: 12}}>
                Supplier
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={focused ? '#02aab0' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#02aab0' : '#748c94', fontSize: 12}}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
