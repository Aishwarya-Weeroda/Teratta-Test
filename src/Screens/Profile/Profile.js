import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import styles from './ProfileStyle';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../component/Header/Header';
import ProfileDetail from './Details/Details';
import {useTheme} from '../../config';

const user = {
  image:
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  name: 'Pavithra Senthil',
  rate: 5,
  description: 'developer',
  email: 'senthilperiyasamy.15@gmail.com',
};

export default function Profile({navigation}) {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="profile"
        renderRight={() => {
          return (
            <Icon name="notifications-outline" size={16} color={colors.text} />
          );
        }}
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              image={user.image}
              textFirst={user.name}
              point={user.rate}
              textSecond={user.description}
              textThird={user.email}
            />
            <TouchableOpacity
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => {
                navigation.navigate('ProfileEdit');
              }}>
              <Text style={{color: colors.text}}>edit profile</Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}>
              <Text style={{color: colors.text}}>change password</Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => navigation.navigate('ContactUs')}>
              <Text style={{color: colors.text}}>contact_us</Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => {
                navigation.navigate('AboutUs');
              }}>
              <Text style={{color: colors.text}}>about us</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="chevron-forward"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => {
                navigation.navigate('ThemeSetting');
              }}>
              <Text style={{color: colors.text}}>Change Theme</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="chevron-forward"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
