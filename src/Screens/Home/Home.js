import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from '../../component/Accordion/Accordion';
import {useTheme} from '../../config';
import Header from '../../component/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {updateTab} from '../../Redux/Features/TopTabSlice';
import Search from '../../component/Search';
import {getAttributes} from '../../Redux/Features/AttributesSlice';
import {getEnquiries} from '../../Redux/Features/EnquirySlice';

const styles = StyleSheet.create({
  menuIcon: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default function Home({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
    dispatch(getAttributes());
  }, []);

  const {colors} = useTheme();
  const enquiryDetails = useSelector(state => state.rfq.enquiryDetails);
  const onBtnPress = (agents, currentAgent) => {
    dispatch(
      updateTab({
        tabs: agents.map(agent => agent.name),
        activeTab: currentAgent,
      }),
    );
    navigation.navigate('Modal');
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="Enquiry"
        renderRight={() => (
          <Icon name="funnel-outline" color={colors.primary} size={20} />
        )}
        onPressRight={() => navigation.navigate('Filter')}
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <Search />
          {enquiryDetails.map((enquiryDetail, index) => (
            <Accordion
              key={enquiryDetail.name + index}
              onBtnPress={onBtnPress}
              data={enquiryDetail.agents}
              name={enquiryDetail.name}
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
