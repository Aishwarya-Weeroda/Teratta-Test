import React from 'react';
import {View, Text, TouchableOpacity, LogBox} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../config';
import styles from './Style';
import {useSelector} from 'react-redux';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Agent from '../components/Agent/Agent';
import Buyer from '../components/Buyer/Buyer';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import Settings from '../Screens/Settings/Settings';
import ThemeSetting from '../Screens/ThemeSettings/ThemeSettings';
import SelectDarkOption from '../Screens/SelectDarkOption';
import ModalScreen from '../component/Model/Model';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);
const Tab = createBottomTabNavigator();

const ProfileStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

const TopTab = createMaterialTopTabNavigator();

const Thbjb = () => {
  const {colors} = useTheme();

  const safeArea = useSafeAreaInsets();
  return (
    <>
      <View style={{flex: 1, paddingTop: safeArea.top}}>
        <Faq />
      </View>
    </>
  );
};

const Faq = () => {
  const {colors} = useTheme();
  const tabs = useSelector(state => state.topTab.tabs);
  const activeTab = useSelector(state => state.topTab.activeTab);
  return (
    <TopTab.Navigator
      initialRouteName={activeTab}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
        },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      {tabs?.map(t => (
        <TopTab.Screen key={t} name={t} component={ModalScreen} />
      ))}
    </TopTab.Navigator>
  );
};

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      initialRouteName={'Profile'}
      screenOptions={() => ({headerShown: false})}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Settings" component={Settings} />
      <ProfileStack.Screen name="ThemeSetting" component={ThemeSetting} />
      <ProfileStack.Screen
        name="SelectDarkOption"
        component={SelectDarkOption}
      />
    </ProfileStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName={'HomeStack'}
      screenOptions={() => ({headerShown: false})}>
      <HomeStack.Screen name="Modal" component={Thbjb} />
      <HomeStack.Screen name="HomeStack" component={Home} />
    </HomeStack.Navigator>
  );
}

const CustomTabBar = ({children, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.shdow, styles.customBtn]}
      onPress={onPress}>
      <LinearGradient
        style={styles.gradientStyle}
        colors={[colors.primary, colors.secondary]}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const opt = {
  tabBarStyle: {
    ...styles.tabBarStyle,
    // backGroundColor: '#fffffff',
    ...styles.shdow,
  },
};

const getColors = (isFocused, colors) =>
  isFocused ? colors.primary : '#748c94';

const TabBar = () => {
  const {colors} = useTheme();
  const getColor = isFocused => getColors(isFocused, colors);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
          ...styles.shdow,
          backgroundColor: colors.tabBg,
          borderColor: colors.border,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <View style={styles.icon}>
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={getColor(focused, colors)}
              />
              <Text style={{color: getColor(focused), fontSize: 12}}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Buyer"
        component={Buyer}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View style={styles.icon}>
              <Icon
                name={focused ? 'ios-people' : 'ios-people-outline'}
                size={size}
                color={getColor(focused)}
              />
              <Text style={{color: getColor(focused), fontSize: 12}}>
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
            <View style={styles.icon}>
              <Icon
                name={focused ? 'cart' : 'cart-outline'}
                size={size}
                color={getColor(focused)}
              />
              <Text style={{color: getColor(focused), fontSize: 12}}>
                Supplier
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <View style={styles.icon}>
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={getColor(focused)}
              />
              <Text style={{color: getColor(focused), fontSize: 12}}>
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
