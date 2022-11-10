import React from 'react';
import {Button, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';
import Card from '../../component/Accordion/Card';
import datas from '../../data/EnquiryList';
import Search from '../../component/Search';
import Header from '../../component/Header/Header';
import Icon from 'react-native-vector-icons/Ionicons';

function EnquiryList({navigation, showSearch}) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <Header
        title="RFQ"
        renderRight={() => (
          <Icon name="funnel-outline" color={colors.primary} size={20} />
        )}
        onPressRight={() => navigation.navigate('Filter')}
      />
      {showSearch && <Search />}
      {datas?.map((data, index) => (
        <Card
          key={data.name + index}
          data={data}
          onBtnPress={() => navigation.navigate('RFQDetails')}
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
