import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import TextInput from '../../component/TextInput';
import Header from '../../component/Header/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {getComments, postComments} from '../../Redux/Features/CommentSlice';
import styles from './newStyle';

export default function NewMessages({id}) {
  const {colors} = useTheme();
  const refFlatList = useRef(null);
  const [input, setInput] = useState('');
  const userId = useSelector(state => state.login.userId);
  const messages = useSelector(state => state.comments.comments[id] || []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments({page: 1, limit: 10, enqDetailId: id}));
    scrollToEnd(false);
  }, []);

  const scrollToEnd = animated => {
    if (refFlatList.current) {
      setTimeout(() => {
        refFlatList.current.scrollToEnd({animated});
      }, 200);
    }
  };
  useEffect(() => {
    scrollToEnd(true);
  }, [messages]);

  const renderItem = item => {
    if (item.userId !== userId) {
      return (
        <View style={styles.userContent}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
            style={[styles.avatar, {borderColor: colors.border}]}
          />
          <View style={{paddingHorizontal: 8, flex: 7}}>
            <Text caption1>{item.userName}</Text>
            <View
              style={[
                styles.userContentMessage,
                {backgroundColor: colors.primaryLight},
              ]}>
              <Text body2 whiteColor>
                {item.comment}
              </Text>
            </View>
          </View>
          <View style={styles.userContentDate}>
            <Text footnote numberOfLines={1}>
              {item.commentTime}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.meContent}>
        <View style={styles.meContentDate}>
          <Text footnote numberOfLines={1}>
            {item.commentTime}
          </Text>
        </View>
        <View style={{paddingLeft: 8, flex: 7}}>
          <View
            style={[styles.meContentMessage, {backgroundColor: colors.card}]}>
            <Text body2>{item.comment}</Text>
          </View>
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (input !== '') {
      dispatch(postComments({enqDetailId: id, comment: input}))
        .unwrap()
        .then(() => {
          dispatch(getComments({page: 1, limit: 10, enqDetailId: id}));
        });
      setInput('');
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <View style={{flex: 1}}>
      <Header title="messages" />
      <KeyboardAvoidingView
        style={{flex: 1, justifyContent: 'flex-end'}}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        enabled>
        <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left', 'down']}>
          <FlatList
            ref={refFlatList}
            data={messages}
            keyExtractor={(item, index) => `message ${index}`}
            renderItem={({item}) => renderItem(item)}
          />
          <View style={styles.inputContent}>
            <View style={{flex: 1}}>
              <TextInput
                onChangeText={text => setInput(text)}
                onSubmitEditing={() => sendMessage()}
                placeholder="type_message"
                value={input}
              />
            </View>
            <TouchableOpacity
              style={[styles.sendIcon, {backgroundColor: colors.primary}]}
              onPress={sendMessage}>
              <Icon
                name="paper-plane"
                size={20}
                color="white"
                enableRTL={true}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
