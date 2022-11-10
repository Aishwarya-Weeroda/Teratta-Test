import React from 'react';
import {View, Text, Button} from 'react-native';
import {useTheme} from '../../config';
import Messages from '../../Screens/Messages/Messages';

function ModalScreen({navigation}) {
  const {colors} = useTheme();

  return <Messages navigation={navigation} />;
}
export default ModalScreen;
