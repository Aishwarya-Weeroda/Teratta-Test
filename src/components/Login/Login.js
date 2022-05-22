import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Checkbox} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './LoginStyle';
const {height, width} = Dimensions.get('screen');
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {login} from '../../Redux/Features/LoginSlice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({userName: '', password: ''});

  const onChange = payload => {
    setUser(user => ({
      ...user,
      ...payload,
    }));
  };

  const onPress = () => async dispatch => {
    await dispatch(login(user));
    navigation.navigate('LoginSuccess');
  };

  return (
    <>
      <LinearGradient
        colors={['#02aab0', '#00cdac']}
        style={styles.container}></LinearGradient>
      <View
        style={[
          styles.centerAlign,
          {
            marginTop: 2,
            backgroundColor: 'rgba(200,200,200,0.9)',
            height: height,
          },
        ]}>
        <View style={styles.inputContainer}>
          <Text
            style={{fontSize: 20, fontStyle: 'italic', textAlign: 'center'}}>
            Sign In
          </Text>
          <View style={{marginTop: 30, marginBottom: 10}}>
            <TextInput placeholder="UserName" style={styles.input} />
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              style={styles.input}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <Checkbox
                accessibilityLabel="dummy"
                style={{width: 20, height: 20, borderColor: '#aaa'}}
              />
              <Text style={{marginLeft: 8}}>Password Remember</Text>
            </View>
            <View style={{flex: 0.5, alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Text style={{color: '#be185d'}}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity onPress={() => dispatch(onPress())}>
              <LinearGradient
                style={{width: width / 1.25, padding: 15, borderRadius: 20}}
                colors={['#02aab0', '#00cdac']}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Sign In
                </Text>
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
