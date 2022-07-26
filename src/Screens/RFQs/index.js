import React from 'react';
import {
  View,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';
import Card from '../../component/Accordion/Card';
import datas from '../../data/EnquiryList';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

function RFQ({navigation}) {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {datas?.map((data, index) => (
            <Card
              key={data.name + index}
              data={data}
              onBtnPress={() => navigation.navigate('CreateRFQ')}
            />
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Enquiry')}
          style={[styles.menuIcon, {backgroundColor: colors.primary}]}>
          <Icon name="md-add" size={25} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

RFQ.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default RFQ;
