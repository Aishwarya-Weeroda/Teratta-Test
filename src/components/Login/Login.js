import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Checkbox} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './LoginStyle';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';
import {Users} from '../../data/Users';

import {login, authenticate} from '../../Redux/Features/LoginSlice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [user, setUser] = useState({userName: 'bvk-hr', password: 'pass1234'});

  const onChange = payload => {
    setUser(user => ({
      ...user,
      ...payload,
    }));
  };

  const onPress = () => {
    dispatch(authenticate(user));
  };

  return (
    <>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.container}
      />
      <View
        style={[
          styles.centerAlign,
          styles.formContainer,
          {backgroundColor: colors.background},
        ]}>
        <View style={[styles.inputContainer, styles.shdow]}>
          <Text style={styles.signInTxt}>Sign In</Text>
          <View style={styles.inputView}>
            <TextInput
              onChangeText={value => onChange({userName: value})}
              placeholder="UserName"
              style={styles.input}
              value={user.userName}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              style={styles.input}
              onChangeText={value => onChange({password: value})}
            />
          </View>
          <View style={styles.rowDir}>
            <View style={styles.checkBoxView}>
              <Checkbox accessibilityLabel="dummy" style={styles.checkBox} />
              <Text style={styles.marginLeft8}>Password Remember</Text>
            </View>
            <View style={styles.forgotBoxView}>
              <TouchableOpacity>
                <Text style={styles.forgotPwdTxt}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loginBtnContainer}>
            <TouchableOpacity onPress={onPress}>
              <LinearGradient
                style={styles.loginBtn}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.primary, colors.secondary]}>
                <Text style={styles.loginTxt}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
