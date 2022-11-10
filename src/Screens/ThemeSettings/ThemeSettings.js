import React from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Header from '../../component/Header/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './ThemeSettingsStyle';

export default function Setting({navigation}) {
  const {colors} = useTheme();
  const forceDark = useSelector(state => state.application.force_dark);
  const font = useSelector(state => state.application.font);

  const darkOption = forceDark
    ? 'always_on'
    : forceDark != null
    ? 'always_off'
    : 'dynamic_system';

  return (
    <View style={{flex: 1}}>
      <Header
        title="Settings"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-back-outline"
              size={20}
              color={colors.primary}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <ScrollView contentContainerStyle={styles.contain}>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <Text style={{color: colors.text}}>theme</Text>
            <View
              style={[styles.themeIcon, {backgroundColor: colors.primary}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => navigation.navigate('SelectFontOption')}>
            <Text body1>font</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text body1 grayColor>
                {font ?? 'default'}
              </Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('SelectDarkOption');
            }}>
            <Text body1>dark_theme</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text body1 grayColor>
                {darkOption}
              </Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
