import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import Header from '../../component/Header/Header';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './Style';

export default function Messages({navigation}) {
  const {colors} = useTheme();
  const refFlatList = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: 'Hello developer',
      created: '08:43 AM',
      user: {
        id: 1,
        name: 'Steve Garrett',
        avatar: null,
      },
    },
    {
      id: 2,
      message: 'You are there. Can you help me ?',
      created: '08:43 AM',
      user: {
        id: 1,
        name: 'Steve Garrett',
        avatar: null,
      },
    },
    {
      id: 3,
      message: "Hi, I'm here !\nHow can I help you?",
      created: '08:45 AM',
    },
  ]);

  const renderItem = item => {
    if (item.user) {
      return (
        <View style={styles.userContent}>
          <Image
            source="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            style={[styles.avatar, {borderColor: colors.border}]}
          />
          <View style={{paddingHorizontal: 8, flex: 7}}>
            <Text caption1>{item.user.name}</Text>
            <View
              style={[
                styles.userContentMessage,
                {backgroundColor: colors.primaryLight},
              ]}>
              <Text body2 whiteColor>
                {item.message}
              </Text>
            </View>
          </View>
          <View style={styles.userContentDate}>
            <Text footnote numberOfLines={1}>
              {item.created}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.meContent}>
        <View style={styles.meContentDate}>
          <Text footnote numberOfLines={1}>
            {item.created}
          </Text>
        </View>
        <View style={{paddingLeft: 8, flex: 7}}>
          <View
            style={[styles.meContentMessage, {backgroundColor: colors.card}]}>
            <Text body2>{item.message}</Text>
          </View>
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (input != '') {
      messages.push({
        id: Math.random().toString(),
        message: input,
        created: '08:45 AM',
      });
      setInput('');
      setMessages(messages);
      if (refFlatList.current) {
        setTimeout(() => {
          refFlatList.current.scrollToEnd({animated: false});
        }, 500);
      }
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      {/* <Header
        title="messages"
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      /> */}
      <SafeAreaView style={BaseStyle.safeAreaView}>
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
            <Icon name="paper-plane" size={20} color="white" enableRTL={true} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
