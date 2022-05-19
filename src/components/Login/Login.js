import React, {useState} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
} from 'native-base';
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
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome To Terata
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input
              value={user.userName}
              onChangeText={userName => onChange({userName})}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={user.password}
              onChangeText={password => onChange({password})}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => dispatch(onPress())}>
            Sign in
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
