import React, {useEffect, useState} from 'react';
import Text from '../../component/Text';
import TextInput from '../../component/TextInput';
import {TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../config';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-community/voice';

export default function AddEnquiry({navigation}) {
  const {colors} = useTheme();
  /**
   *
   * onSave ChooseBusiness
   */
  const onSaveBusiness = async () => {
    await stopRecording();
    navigation.goBack();
  };
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
      console.log('errooooooo', e);
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
      console.log('errooooooo', error);
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
      console.log('errooooooo', error);
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
      console.log('errooooooo', error);
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
      console.log('errooooooo');
    }
  };

  return (
    <View style={styles.contain}>
      <View style={[styles.content, {backgroundColor: colors.card}]}>
        <Text title3 medium style={{padding: 10}}>
          Add Enquiry
        </Text>
        <View style={styles.wrapContent}>
          <View style={styles.contentTitle}>
            <Text headline>Count & Blend</Text>
          </View>
          <TextInput
            placeholder="Enter Count & Blend"
            style={{backgroundColor: '#e7e5e4'}}
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
            style={{backgroundColor: '#e7e5e4'}}
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
            style={{backgroundColor: '#e7e5e4'}}
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
            style={{backgroundColor: '#e7e5e4'}}
            icon={
              currentField !== 'quantity'
                ? getIcon('quantity', startRecordingQuantity)
                : fontIcon
            }
            value={quantity}
            onChangeText={text => setQuantity(text)}
          />
        </View>
        <View style={[styles.contentButton, {borderTopColor: colors.border}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text body2 semibold>
              close
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderLeftColor: colors.border,
                borderLeftWidth: 0.5,
              },
            ]}
            onPress={onSaveBusiness}>
            <Text body2 semibold>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
