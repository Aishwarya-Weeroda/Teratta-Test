import React from 'react';
import {Button, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';
import EnquiryList from '../EnquiryList';

function SupplierHome({navigation}) {
  const {colors} = useTheme();

  return <EnquiryList showSearch={true} navigation={navigation} />;
}

SupplierHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SupplierHome;
