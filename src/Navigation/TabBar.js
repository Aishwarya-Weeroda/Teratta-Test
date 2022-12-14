import React from 'react';
import {View, LogBox} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../config';
import styles from './Style';
import Text from '../component/Text';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import Agent from '../components/Agent/Agent';
import Buyer from '../components/Buyer/Buyer';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import Settings from '../Screens/Settings/Settings';
import ThemeSetting from '../Screens/ThemeSettings/ThemeSettings';
import SelectDarkOption from '../Screens/SelectDarkOption';
import Enquiry from '../Screens/Enquiry';
import RFQDetails from '../Screens/RFQDetails';
import AddEnquiry from '../Screens/AddEnquiry';
import Filter from '../Screens/Filter';
import SupplierHome from '../Screens/SupplierHome';
import Agents from '../Screens/Agents';
import Suppliers from '../Screens/Suppliers';
import Buyers from '../Screens/Buyers';
import UserDetails from '../Screens/UserDetails';
import Comments from '../Screens/Comments';
import AgentHome from '../Screens/AgentHome';
import EnquiryDetails from '../Screens/EnquiryDetails';
import CreateRFQ from '../Screens/CreateRFQs';
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

function canTabBarVisibile(route) {
  // If the focused route is not found, we
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'test':
      return 'none';
    default:
      return 'flex';
  }
}

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
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Modal" component={Comments} />
      <HomeStack.Screen name="HomeStack" component={Home} />
      <HomeStack.Screen name="Enquiry" component={Enquiry} />
      <HomeStack.Screen name="Filter" component={Filter} />
      <HomeStack.Screen
        name="AddEnquiry"
        component={AddEnquiry}
        options={
          {
            // animation: 'fade',
            // contentStyle: {
            //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
            // },
            // presentation: 'transparentModal',
            // gestureEnabled: false,
          }
        }
      />
    </HomeStack.Navigator>
  );
}

function AgentsScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName={'Agents'}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Agents" component={Agents} />
      <HomeStack.Screen name="UserDetails" component={UserDetails} />
    </HomeStack.Navigator>
  );
}

function BuyersScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName={'Buyers'}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Buyers" component={Buyers} />
      <HomeStack.Screen name="UserDetails" component={UserDetails} />
    </HomeStack.Navigator>
  );
}

function SupplierScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName={'Suppliers'}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Suppliers" component={Suppliers} />
      <HomeStack.Screen name="UserDetails" component={UserDetails} />
    </HomeStack.Navigator>
  );
}

function AgentStackScreen() {
  return (
    <AgentStack.Navigator
      initialRouteName={'AgentHome'}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Modal" component={Comments} />
      <AgentStack.Screen name="enquiryDetails" component={EnquiryDetails} />
      <AgentStack.Screen name="Filter" component={Filter} />
      <AgentStack.Screen name="AgentHome" component={AgentHome} />
      <AgentStack.Screen name="RFQDetails" component={RFQDetails} />
      <AgentStack.Screen name="Create RFQ" component={CreateRFQ} />
    </AgentStack.Navigator>
  );
}

function SupplierStackScreen() {
  return (
    <SupplierStack.Navigator
      initialRouteName={'SupplierHome'}
      screenOptions={{headerShown: false}}>
      <SupplierStack.Screen name="Filter" component={Filter} />
      <SupplierStack.Screen name="SupplierHome" component={SupplierHome} />
      <SupplierStack.Screen name="RFQDetails" component={RFQDetails} />
    </SupplierStack.Navigator>
  );
}

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
        headerShown: false,
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
                Enquiries
              </Text>
            </View>
          ),
        })}
      />
      <BuyerBottomTab.Screen
        name="Agent"
        component={AgentsScreen}
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
        headerShown: false,
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
              <Text style={{color: getColor(focused), fontSize: 12}}>
                Enquiries
              </Text>
            </View>
          ),
        })}
      />
      <AgentBottomTab.Screen
        name="Buyer"
        component={BuyersScreen}
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
                Buyers
              </Text>
            </View>
          ),
        }}
      />
      <AgentBottomTab.Screen
        name="Supplier"
        component={SupplierScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View style={styles.icon}>
              <Icon
                name={focused ? 'ios-people' : 'ios-people-outline'}
                size={size}
                color={getColor(focused)}
              />
              <Text style={{color: getColor(focused), fontSize: 12}}>
                Suppliers
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
        headerShown: false,
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
                Enquiries
              </Text>
            </View>
          ),
        })}
      />
      <SupplierBottomTab.Screen
        name="Agent"
        component={AgentsScreen}
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
