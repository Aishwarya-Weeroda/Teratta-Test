import React from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './Styles';
import {useTheme} from '../../config';

export default function AppLoading() {
  const {colors} = useTheme();
  const appstatus = useSelector(state => state.app);
  return appstatus.loading ? (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <ActivityIndicator
          style={styles.activitystyle}
          size="large"
          color={colors.primary}
        />
        <Text style={styles.text}>Loading...</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}
