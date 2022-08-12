import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Checkbox} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './LoginStyle';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';

import {authenticate} from '../../Redux/Features/LoginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [user, setUser] = useState({
    userName: 'xyz-hr',
    password: 'pass1234',
    usrError: false,
    pwdError: false,
  });

  const onChange = payload => {
    setUser(preState => ({
      ...preState,
      ...payload,
    }));
  };

  const onPress = () => {
    if (!user.userName) {
      onChange({usrError: true});
      return;
    } else if (!user.password) {
      onChange({pwdError: true});
      return;
    }
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
              onChangeText={value =>
                onChange({userName: value, usrError: false})
              }
              placeholder="UserName"
              style={[styles.input, user.usrError && {marginVertical: 5}]}
              value={user.userName}
            />
            {user.usrError && (
              <Text style={styles.forgotPwdTxt}>Please Enter the UserName</Text>
            )}
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              style={[styles.input, user.pwdError && {marginVertical: 5}]}
              onChangeText={value =>
                onChange({password: value, pwdError: false})
              }
            />
            {user.pwdError && (
              <Text style={styles.forgotPwdTxt}>Please Enter the Password</Text>
            )}
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
