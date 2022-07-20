import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import styles from './Style';

export default function Messages({id, callback}) {
  const messages = useSelector(state => state.comments.comments[id]);
  const userId = useSelector(state => state.login.userId);
  useEffect(() => {
    callback(id);
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
  const {colors} = useTheme();
  const refFlatList = useRef(null);

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
            <Text caption1>{item.userId}</Text>
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
              {item.commentDate}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.meContent}>
        <View style={styles.meContentDate}>
          <Text footnote numberOfLines={1}>
            {item.commentDate}
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

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <FlatList
        ref={refFlatList}
        data={messages}
        keyExtractor={(item, index) => `message ${index}`}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );
}
