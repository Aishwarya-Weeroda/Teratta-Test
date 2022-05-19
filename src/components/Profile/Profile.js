import React from 'react';
import {Button, View} from 'react-native';
import PropTypes from 'prop-types';

function Profile({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
