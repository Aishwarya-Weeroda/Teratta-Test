import React from 'react';
import {View} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import ProfileDetail from '../Profile/Details/Details';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserDetails({navigation, route}) {
  const {colors} = useTheme();
  const user = route.params.user;
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="User Details"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-back-outline"
              size={25}
              color={colors.primary}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <View style={{padding: 20}}>
          <ProfileDetail
            textFirst={`${user.firstName} ${user.lastName}`}
            textSecond={user.orgName}
            textThird={user.email}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
