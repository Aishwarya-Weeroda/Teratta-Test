import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
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
// import enquiryDetails from '../../data/EnquiryDetails';

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchForm: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  lineForm: {
    width: 1,
    height: '100%',
    margin: 10,
  },
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
export default function SentRFQ({navigation}) {
  const {colors} = useTheme();
  const enquiryDetails = useSelector(state => state.rfq.sentRFQS);
  const dispatch = useDispatch();
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
      {/* <Header title="RFQ" /> */}
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          {enquiryDetails.map((enquiryDetail, index) => (
            <Accordion
              key={enquiryDetail.name + index}
              onBtnPress={onBtnPress}
              data={enquiryDetail.agents}
              name={enquiryDetail.name}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
