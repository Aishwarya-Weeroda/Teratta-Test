import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../config';
import styles from './styles';
import TextInput from '../../component/TextInput';
import Text from '../../component/Text';
import Header from '../../component/Header/Header';
import Tabs from './tabs';
import {useSelector, useDispatch} from 'react-redux';
import {postComments, getComments} from '../../Redux/Features/CommentSlice';

const Comments = ({navigation}) => {
  const tabs = useSelector(state => state.topTab.orgs);
  const activeTab = useSelector(state => state.topTab.activeTab);
  const enquiryId = useSelector(state => state.topTab.enquiryId);
  const enquiryList = useSelector(state => state.enquiries.enquiryList);
  const enquiry = enquiryList.find(enq => enq.enquiryId === enquiryId);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [id, setId] = useState('');
  const sendMessage = () => {
    if (comment !== '') {
      dispatch(postComments({enqDetailId: id, comment}))
        .unwrap()
        .then(() => {
          dispatch(getComments({page: 1, limit: 10, enqDetailId: id}));
        });
      setComment('');
    }
  };
  const callback = payload => {
    setId(payload);
  };
  const renderAttribute = (attribute, index) => (
    <View
      key={attribute.attributeId + index}
      style={{marginLeft: 10, marginBottom: 10}}>
      <Text caption1 grayColor>
        {attribute.name}
      </Text>
      <Text footnote semibold style={{marginTop: 5}}>
        {attribute.value}
      </Text>
    </View>
  );
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <Header
          title="Enquiry Details"
          style={{borderColor: colors.border}}
          renderLeft={() => {
            return (
              <Icon
                name="chevron-back"
                size={25}
                color={colors.primary}
                enableRTL={true}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={{flex: 2}}>
          <ScrollView scrollEventThrottle={8}>
            {enquiry?.attributes?.map((attribute, index) =>
              renderAttribute(attribute, index),
            )}
          </ScrollView>
        </View>
        <View style={{flex: 8}}>
          <Tabs tabs={tabs} activeTab={activeTab} callback={callback} />
        </View>
        <View style={{flex: 1, marginBottom: 10}}>
          <View style={styles.inputContent}>
            <View style={{flex: 1}}>
              <TextInput
                onChangeText={text => setComment(text)}
                onSubmitEditing={sendMessage}
                placeholder="Type Message ..."
                value={comment}
              />
            </View>
            <TouchableOpacity
              onPress={sendMessage}
              style={[styles.sendIcon, {backgroundColor: colors.primary}]}>
              <Icon
                name="paper-plane"
                size={20}
                color="white"
                enableRTL={true}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default Comments;
