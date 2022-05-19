import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Login from '../components/Login/Login';
import HomeNavigator from './TabNavigation';

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
        component={HomeNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  return <>{userState.isLoggedIn ? authStack() : nonAuthStack()}</>;
};

export default StackNavigation;
