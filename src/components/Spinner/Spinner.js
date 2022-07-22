import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './Styles';

export default function AppLoading() {
  const appstatus = useSelector(state => state.app);
  return appstatus.loading ? (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <ActivityIndicator
          style={styles.activitystyle}
          size="large"
          color="blue"
        />
        <Text style={styles.text}>Loading...</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}
