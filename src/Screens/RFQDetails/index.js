import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import TextInput from '../../component/TextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './style';
import Header from '../../component/Header/Header';

export default function RFQDetails({navigation}) {
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
            source={{
              uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
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
      <Header
        title="Details"
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
      <KeyboardAvoidingView
        style={{flex: 1, justifyContent: 'flex-end'}}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        enabled>
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
              <Text caption2 grayColor>
                Color
              </Text>
              <Text footnote semibold style={{marginTop: 5}}>
                BC22GR511908
              </Text>
            </View>
            <View style={{marginLeft: 10, marginBottom: 10}}>
              <Text caption2 grayColor>
                Shade
              </Text>
              <Text footnote semibold style={{marginTop: 5}}>
                Cerulean Melange
              </Text>
            </View>
            <View style={{marginLeft: 10, marginBottom: 10}}>
              <Text caption2 grayColor>
                Quantity
              </Text>
              <Text footnote semibold style={{marginTop: 5}}>
                45 Kgs
              </Text>
            </View>
          </ScrollView>
        </View>
        <SafeAreaView style={{flex: 8}} edges={['right', 'left']}>
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
                placeholder="Type Message ..."
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
