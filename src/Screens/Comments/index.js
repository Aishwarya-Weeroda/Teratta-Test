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
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [id, setId] = useState('');
  const refFlatList = useRef(null);
  const sendMessage = () => {
    if (comment !== '') {
      dispatch(postComments({enqDetailId: id, comment}))
        .unwrap()
        .then(() => {
          dispatch(
            getComments({enqDetailId: '92adf645-cace-4ca8-bf02-e59c5a2e6d82'}),
          );
        });
      setComment('');   
    }
  };
  const callback = payload => {
    setId(payload);
  };
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
            <View style={{marginLeft: 10, marginBottom: 10}}>
              <Text caption1 grayColor>
                Count & Blend
              </Text>
              <Text footnote semibold style={{marginTop: 5}}>
                42s HTR 45% Bamboo 55% Cotton Compact
              </Text>
            </View>
            <View style={{marginLeft: 10, marginBottom: 10}}>
              <Text caption1 grayColor>
                Color
              </Text>
              <Text footnote semibold style={{marginTop: 5}}>
                BC22GR511908
              </Text>
            </View>
            <View style={{marginLeft: 10, marginBottom: 10}}>
              <Text caption1 grayColor>
                Shade
              </Text>
              <Text footnote semibold style={{marginTop: 5}}>
                Cerulean Melange
              </Text>
            </View>
            <View style={{marginLeft: 10, marginBottom: 10}}>
              <Text caption1 grayColor>
                Quantity
              </Text>
              <Text footnote semibold style={{marginTop: 5}}>
                45 Kgs
              </Text>
            </View>
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
