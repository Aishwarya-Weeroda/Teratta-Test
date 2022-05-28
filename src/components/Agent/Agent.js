import React from 'react';
import {Button, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';

function Agent({navigation}) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button
        title="Go to Profiles"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

Agent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Agent;
