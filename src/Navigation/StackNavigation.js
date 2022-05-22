import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Login from '../components/Login/Login';
import Tabs from './TabNavigation';
import TabBar from './TabBar';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const userState = useSelector(state => state.login);
  const nonAuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  const authStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginSuccess"
        component={TabBar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  return <>{userState.isLoggedIn ? authStack() : nonAuthStack()}</>;
};

export default StackNavigation;
