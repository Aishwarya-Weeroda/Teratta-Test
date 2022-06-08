import React from 'react';
import {Button, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';
import Card from '../../component/Accordion/Card';
import datas from '../../data/EnquiryList';

function EnquiryList({navigation}) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {datas?.map((data, index) => (
        <Card
          key={data.name + index}
          data={data}
          onBtnPress={() => navigation.navigate('CreateRFQ')}
        />
      ))}
    </View>
  );
}

EnquiryList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default EnquiryList;
