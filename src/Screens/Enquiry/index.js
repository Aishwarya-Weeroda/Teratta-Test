import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import Tag from '../../component/Tag';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

export default function Messages({navigation}) {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="Add Enquiry"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-back-outline"
              size={30}
              color={colors.primary}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return <Icon name="md-add" size={30} color={colors.primary} />;
        }}
        onPressRight={() => navigation.navigate('AddEnquiry')}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <ScrollView scrollEventThrottle={8}>
          <View style={[styles.inputContainer, styles.shdow, {flex: 1}]}>
            <View style={{flex: 1, margin: 5}}>
              <Text>Sign In</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 0.5}}></View>
              <View
                style={{
                  flex: 0.5,
                  alignItems: 'flex-end',
                  marginRight: -12,
                  marginBottom: -10,
                }}>
                <Icon
                  name="ios-create-outline"
                  size={20}
                  color={colors.primary}
                  enableRTL={true}
                />
              </View>
            </View>
          </View>
          <View style={[styles.inputContainer, styles.shdow]}>
            <Text>Sign In</Text>
          </View>
          <View style={[styles.inputContainer, styles.shdow]}>
            <Text>Sign In</Text>
          </View>
          <View style={[styles.inputContainer, styles.shdow]}>
            <Text>Sign In</Text>
          </View>
          <View style={[styles.inputContainer, styles.shdow]}>
            <Text>Sign In</Text>
          </View>
          <View style={[styles.inputContainer, styles.shdow]}>
            <Text>Sign In</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity>
          <LinearGradient
            style={styles.loginBtn}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.primary, colors.secondary]}>
            <Text style={styles.loginTxt}>Send Enquiry</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
