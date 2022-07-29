import React, {useEffect} from 'react';
import {View, RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '../../config';
import Card from '../../component/Accordion/Card';
import {getEnquiries} from '../../Redux/Features/EnquirySlice';

function RFQ({navigation}) {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const enquires = useSelector(state => state.enquiries.enquiryList);
  useEffect(() => {
    loadData();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, []);
  const loadData = () => {
    dispatch(getEnquiries());
  };
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
          {enquires?.map((data, index) => {
            if (data.enquiry.length) {
              return (
                <Card
                  status={data.status}
                  key={data.enqDetailId + index}
                  data={data.enquiry[0]}
                  onBtnPress={() =>
                    navigation.navigate('enquiryDetails', {
                      enquiry: {
                        ...data.enquiry[0],
                        enqDetailId: data.enqDetailId,
                      },
                    })
                  }
                />
              );
            }
            return null;
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default RFQ;
