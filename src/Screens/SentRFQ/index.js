import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Accordion from '../../component/Accordion/Accordion';
import {useTheme} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {updateTab} from '../../Redux/Features/TopTabSlice';
import {getComments} from '../../Redux/Features/CommentSlice';
import {getRFQs} from '../../Redux/Features/RFQsSlice';

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
  useEffect(() => {
    dispatch(getRFQs({page: 1, limit: 10}));
  }, []);

  const {colors} = useTheme();
  const rfqs = useSelector(state => state.rfq.sentRFQS);
  const dispatch = useDispatch();
  const onBtnPress = (agents, currentAgent) => {
    dispatch(
      getComments({enqDetailId: '92adf645-cace-4ca8-bf02-e59c5a2e6d82'}),
    );
    dispatch(
      updateTab({
        orgs: agents.map(agent => ({
          name: agent.name,
          id: '92adf645-cace-4ca8-bf02-e59c5a2e6d82',
        })),
        activeTab: currentAgent,
      }),
    );
    navigation.navigate('Modal');
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          {rfqs?.map((rfq, index) => (
            <Accordion
              key={rfq.name + index}
              onBtnPress={onBtnPress}
              data={rfq.rfq_details}
              name={rfq.name}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
