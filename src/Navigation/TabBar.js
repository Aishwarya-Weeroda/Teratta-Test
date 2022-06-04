import React from 'react';
import {View, TouchableOpacity, LogBox, ScrollView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../config';
import styles from './Style';
import {useSelector} from 'react-redux';
import TextInput from '../component/TextInput';
import Text from '../component/Text';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import Agent from '../components/Agent/Agent';
import Buyer from '../components/Buyer/Buyer';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import Settings from '../Screens/Settings/Settings';
import Messages from '../Screens/Messages/Messages';
import ThemeSetting from '../Screens/ThemeSettings/ThemeSettings';
import SelectDarkOption from '../Screens/SelectDarkOption';
import Enquiry from '../Screens/Enquiry';
import AddEnquiry from '../Screens/AddEnquiry';
import Header from '../component/Header/Header';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);
const Tab = createBottomTabNavigator();

const ProfileStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

const EnquiryStack = createNativeStackNavigator();

const TopTab = createMaterialTopTabNavigator();

function canTabBarVisibile(route) {
  // If the focused route is not found, we
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Modal':
      return 'none';
    default:
      return 'flex';
  }
}
const Thbjb = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <Header
          title="Enquiry Details"
          style={{borderColor: colors.border}}
          renderLeft={() => {
            return (
              <Icon
                name="chevron-back"
                size={25}
                color={colors.primary}
                enableRTL={true}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={{flex: 2}}>
          <ScrollView scrollEventThrottle={8}>
            <Text textAlign="center">We Need Show Enquiry Details</Text>
          </ScrollView>
        </View>
        <View style={{flex: 8}}>
          <Faq />
        </View>
        <View style={{flex: 1, marginBottom: 10}}>
          <View style={styles.inputContent}>
            <View style={{flex: 1}}>
              <TextInput
                // onChangeText={text => setInput(text)}
                // onSubmitEditing={() => sendMessage()}
                placeholder="Type Message ..."
                // value={input}
              />
            </View>
            <TouchableOpacity
              style={[styles.sendIcon, {backgroundColor: colors.primary}]}>
              <Icon
                name="paper-plane"
                size={20}
                color="white"
                enableRTL={true}
              />
            </TouchableOpacity>
          </View>
        </View>
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
          borderWidth: 0.7,
          borderColor: colors.border,
          ...styles.topTabBarStyle,
          // ...styles.shdow,
          // backgroundColor: colors.background,
        },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      {tabs?.map(t => (
        <TopTab.Screen key={t} name={t} component={Messages} />
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
    <HomeStack.Navigator initialRouteName={'HomeStack'}>
      <HomeStack.Screen
        name="Modal"
        component={Thbjb}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="HomeStack"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Enquiry"
        component={Enquiry}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="AddEnquiry"
        component={AddEnquiry}
        options={{
          headerShown: false,
          // animation: 'fade',
          // contentStyle: {
          //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
          // },
          // presentation: 'transparentModal',
          // gestureEnabled: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

function EnquiryStackScreen() {
  return (
    <EnquiryStack.Navigator initialRouteName={'Enquiry'}>
      <EnquiryStack.Screen
        name="Enquiry"
        component={Enquiry}
        options={{headerShown: false}}
      />
      <EnquiryStack.Screen
        name="AddEnquiry"
        component={AddEnquiry}
        options={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          presentation: 'transparentModal',
          gestureEnabled: false,
        }}
      />
    </EnquiryStack.Navigator>
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
          // ...styles.tabBarStyle,
          ...styles.shdow,
          backgroundColor: colors.tabBg,
          borderColor: colors.border,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: canTabBarVisibile(route),
          },
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <View style={styles.icon}>
              <Icon
                name={focused ? 'copy-sharp' : 'copy-outline'}
                size={size}
                color={getColor(focused, colors)}
              />
              <Text style={{color: getColor(focused), fontSize: 12}}>
                Enquiry
              </Text>
            </View>
          ),
        })}
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
      {/* <Tab.Screen
        name="EnquryTab"
        component={EnquiryStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <Icon
              name={focused ? 'add-outline' : 'add-outline'}
              size={size}
              color="#fff"
            />
          ),
          tabBarButton: props => <CustomTabBar {...props} />,
        }}
      /> */}
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
