import React from 'react';
import {
  View,
  TouchableOpacity,
  LogBox,
  ScrollView,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('screen');

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
import SentRFQ from '../Screens/SentRFQ';
import RFQs from '../Screens/RFQs';
import CreateRFQ from '../Screens/CreateRFQs';
import RFQDetails from '../Screens/RFQDetails';
import AddEnquiry from '../Screens/AddEnquiry';
import Header from '../component/Header/Header';
import Search from '../component/Search';
import EnquiryList from '../Screens/EnquiryList';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);
const Tab = createBottomTabNavigator();

const BuyerBottomTab = createBottomTabNavigator();
const AgentBottomTab = createBottomTabNavigator();
const SupplierBottomTab = createBottomTabNavigator();

const ProfileStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();
const AgentStack = createNativeStackNavigator();
const SupplierStack = createNativeStackNavigator();

const TopTab = createMaterialTopTabNavigator();
const AgentTopTab = createMaterialTopTabNavigator();

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
const TopTabBarContainer = ({navigation}) => {
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
          <TopTabBar />
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

const AgentTopTabBarContainer = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <Header title="Enquiry & RFQ" style={{borderColor: colors.border}} />
        <Search />
        <View style={{flex: 8}}>
          <AgentTopTabBar />
        </View>
      </View>
    </>
  );
};

const TopTabBar = () => {
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
          ...styles.topTabBarStyle,
        },
        tabBarItemStyle: {width: width / 2},
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <AgentTopTab.Screen name="Enquiry List" component={EnquiryList} />
      <AgentTopTab.Screen name="Sent RFQ" component={SentRFQ} />
    </AgentTopTab.Navigator>
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
        component={TopTabBarContainer}
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

function AgentStackScreen() {
  return (
    <AgentStack.Navigator
      initialRouteName={'AgentHome'}
      screenOptions={{headerShown: false}}>
      <AgentStack.Screen
        name="Modal"
        component={TopTabBarContainer}
        options={{headerShown: false}}
      />
      <AgentStack.Screen name="CreateRFQ" component={CreateRFQ} />
      <AgentStack.Screen name="AgentHome" component={AgentTopTabBarContainer} />
      <AgentStack.Screen name="RFQDetails" component={RFQDetails} />
    </AgentStack.Navigator>
  );
}

function SupplierStackScreen() {
  return (
    <SupplierStack.Navigator
      initialRouteName={'RFQs'}
      screenOptions={{headerShown: false}}>
      <SupplierStack.Screen name="RFQs" component={RFQs} />
      <SupplierStack.Screen name="RFQDetails" component={RFQDetails} />
    </SupplierStack.Navigator>
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

export const BuyerBottomTabs = () => {
  const {colors} = useTheme();
  const getColor = isFocused => getColors(isFocused, colors);
  return (
    <BuyerBottomTab.Navigator
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
      <BuyerBottomTab.Screen
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
      <BuyerBottomTab.Screen
        name="Agents"
        component={Agent}
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
      <BuyerBottomTab.Screen
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
    </BuyerBottomTab.Navigator>
  );
};

export const AgentBottomTabs = () => {
  const {colors} = useTheme();
  const getColor = isFocused => getColors(isFocused, colors);
  return (
    <AgentBottomTab.Navigator
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
      <AgentBottomTab.Screen
        name="Home"
        component={AgentStackScreen}
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
              <Text style={{color: getColor(focused), fontSize: 12}}>RFQs</Text>
            </View>
          ),
        })}
      />
      <BuyerBottomTab.Screen
        name="Agents"
        component={CreateRFQ}
        options={{
          headerShown: false,
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
      <AgentBottomTab.Screen
        name="Supplier"
        component={Agent}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View style={styles.icon}>
              <Icon
                name={focused ? 'ios-people' : 'ios-people-outline'}
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
      <AgentBottomTab.Screen
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
    </AgentBottomTab.Navigator>
  );
};
export const SupplierBottomTabs = () => {
  const {colors} = useTheme();
  const getColor = isFocused => getColors(isFocused, colors);
  return (
    <SupplierBottomTab.Navigator
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
      <SupplierBottomTab.Screen
        name="Home"
        component={SupplierStackScreen}
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
      <SupplierBottomTab.Screen
        name="Agents"
        component={Agent}
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
      <SupplierBottomTab.Screen
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
    </SupplierBottomTab.Navigator>
  );
};
