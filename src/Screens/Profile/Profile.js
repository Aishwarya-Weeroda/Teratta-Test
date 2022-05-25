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

const colors = {
  primary: '#E5634D',
  primaryDark: '#C31C0D',
  primaryLight: '#FF8A65',
  accent: '#4A90A4',
  background: 'white',
  card: '#F5F5F5',
  text: '#212121',
  border: '#c7c7cc',
};
const user = {
  image:
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  name: 'Pavithra Senthil',
  rate: 5,
  description: 'developer',
  email: 'senthilperiyasamy.15@gmail.com',
};

export default function Profile({navigation}) {
  return (
    <View style={{flex: 1}}>
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
              <Text>edit profile</Text>
              <Icon
                name="chevron-forward"
                size={18}
                color="#02aab0"
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
              <Text>change password</Text>
              <Icon
                name="chevron-forward"
                size={18}
                color="#02aab0"
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => navigation.navigate('ContactUs')}>
              <Text>contact_us</Text>
              <Icon
                name="chevron-forward"
                size={18}
                color="#02aab0"
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
              <Text>about us</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="chevron-forward"
                  size={18}
                  color="#02aab0"
                  style={{marginLeft: 5}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          {/* <Button full loading={loading} onPress={onLogout}>
            {t('sign_out')}
          </Button> */}
        </View>
      </SafeAreaView>
    </View>
  );
}
