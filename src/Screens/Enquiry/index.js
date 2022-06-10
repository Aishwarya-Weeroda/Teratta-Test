import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import TextInput from '../../component/TextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-community/voice';
import styles from './style';

export default function Messages({navigation}) {
  const {colors} = useTheme();

  const datas = [
    {
      id: 1,
      org: 'Royal Yarns',
      emails: [
        {
          id: 1,
          email: 'test1@royal.com',
        },
        {
          id: 2,
          email: 'test2@royal.com',
        },
        {
          id: 3,
          email: 'test3@royal.com',
        },
      ],
    },
    {
      id: 2,
      org: 'Shanmugam Yarns',
      emails: [
        {
          id: 1,
          email: 'test1@shanmugam.com',
        },
        {
          id: 2,
          email: 'test2@shanmugam.com',
        },
        {
          id: 3,
          email: 'test3@shanmugam.com',
        },
      ],
    },
  ];

  const [data, setData] = useState(datas);

  const getIcon = (field, method) => (
    <TouchableOpacity onPress={() => method(field)}>
      <Icon name="mic-sharp" size={20} color={colors.text} enableRTL={true} />
    </TouchableOpacity>
  );

  const fontIcon = (
    <TouchableOpacity onPress={() => stopRecording()}>
      <Icon
        name="stop-circle-outline"
        size={20}
        color={colors.primary}
        enableRTL={true}
      />
    </TouchableOpacity>
  );
  const [countBlend, setCountBlend] = useState('');
  const [color, setColor] = useState('');
  const [shade, setShade] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentField, setCurrentField] = useState();
  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecordingBlend = async field => {
    console.log('startRecordingBlend');
    setCurrentField(field);
    Voice.onSpeechResults = blendHandler;
    setCountBlend('');
    try {
      await Voice.destroy().then(Voice.removeAllListeners);
      await Voice.start('en-US').then(console.log('started'));
    } catch (e) {
      console.log('error', e);
    }
  };

  const blendHandler = e => {
    setCountBlend(e.value[0]);
  };

  const startRecordingColor = async field => {
    setCurrentField(field);
    Voice.onSpeechResults = colorHandler;
    setColor('');
    try {
      await Voice.destroy().then(Voice.removeAllListeners);
      await Voice.start('en-US').then(console.log('started'));
    } catch (error) {
      console.log('error', error);
    }
  };

  const colorHandler = e => {
    setColor(e.value[0]);
  };

  const startRecordingShade = async field => {
    setCurrentField(field);
    Voice.onSpeechResults = shadeHandler;
    setShade('');
    try {
      await Voice.destroy().then(Voice.removeAllListeners);
      await Voice.start('en-US').then(console.log('started'));
    } catch (error) {
      console.log('error', error);
    }
  };

  const shadeHandler = e => {
    setShade(e.value[0]);
  };

  const startRecordingQuantity = async field => {
    setCurrentField(field);
    Voice.onSpeechResults = quantityHandler;
    setQuantity('');
    try {
      await Voice.destroy().then(Voice.removeAllListeners);
      await Voice.start('en-US').then(console.log('started'));
    } catch (error) {
      console.log('error', error);
    }
  };

  const quantityHandler = e => {
    setQuantity(e.value[0]);
  };

  const stopRecording = async () => {
    setCurrentField('');
    try {
      await Voice.stop().then(console.log('stoped'));
    } catch (error) {
      console.log('error', error);
    }
  };

  const onselect = (id, recipient) => {
    const newData = [...data];
    newData
      .filter(item => item.id === id)
      .map(item =>
        item.emails
          .filter(email => email.id === recipient.id)
          .map(email => (email.selected = !email.selected)),
      );
    setData(newData);
  };

  const renderRecipient = recipients => {
    return (
      <View style={{flex: 1}} key={recipients.org}>
        <TouchableOpacity>
          <Text headline>{recipients.org}</Text>
        </TouchableOpacity>
        {recipients.emails?.map(recipient => (
          <TouchableOpacity
            key={recipient.id}
            onPress={() => onselect(recipients.id, recipient)}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.checkBoxView}>
                <Icon style={{marginRight: 5}} name="mail" size={15} />
                <Text style={{color: 'grey'}}>{recipient.email}</Text>
              </View>
              <View style={styles.forgotBoxView}>
                {recipient.selected && (
                  <Icon
                    name="checkmark-circle"
                    color={colors.primary}
                    size={17}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="Add Enquiry"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-back-outline"
              size={30}
              color={colors.primary}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <View style={{flex: 4}}>
          <ScrollView scrollEventThrottle={8}>
            <View style={[styles.content]}>
              <View style={styles.wrapContent}>
                <View style={styles.contentTitle}>
                  <Text headline>Count & Blend</Text>
                </View>
                <TextInput
                  placeholder="Enter Count & Blend"
                  icon={
                    currentField !== 'blend'
                      ? getIcon('blend', startRecordingBlend)
                      : fontIcon
                  }
                  value={countBlend}
                  onChangeText={text => setCountBlend(text)}
                />
                <View style={styles.contentTitle}>
                  <Text headline>Color</Text>
                </View>
                <TextInput
                  placeholder="Enter Color"
                  icon={
                    currentField !== 'color'
                      ? getIcon('color', startRecordingColor)
                      : fontIcon
                  }
                  value={color}
                  onChangeText={text => setColor(text)}
                />
                <View style={styles.contentTitle}>
                  <Text headline>Shade</Text>
                </View>
                <TextInput
                  placeholder="Enter Shade"
                  icon={
                    currentField !== 'shade'
                      ? getIcon('shade', startRecordingShade)
                      : fontIcon
                  }
                  value={shade}
                  onChangeText={text => setShade(text)}
                />
                <View style={styles.contentTitle}>
                  <Text headline>Quantity</Text>
                </View>
                <TextInput
                  placeholder="Enter Quantity"
                  icon={
                    currentField !== 'quantity'
                      ? getIcon('quantity', startRecordingQuantity)
                      : fontIcon
                  }
                  value={quantity}
                  onChangeText={text => setQuantity(text)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={[styles.contentTitle, {marginHorizontal: 10}]}>
          <Text headline>Select Recipients</Text>
        </View>
        <View style={{flex: 3, marginHorizontal: 10, marginBottom: 20}}>
          <View style={[styles.inputContainer, styles.shdow]}>
            <ScrollView scrollEventThrottle={8}>
              {data.map(recipient => renderRecipient(recipient))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('AddRecipient')}>
          <LinearGradient
            style={styles.loginBtn}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.primary, colors.secondary]}>
            <Text style={styles.loginTxt}>Add Enquiry</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
