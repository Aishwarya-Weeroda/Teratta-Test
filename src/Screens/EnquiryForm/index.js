import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './style';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-community/voice';
import {BaseStyle, useTheme} from '../../config';

const EnquiryForm = ({onDelete, index, canDelete, isRecording, onFocus}) => {
  const [countBlend, setCountBlend] = useState('');
  const [color, setColor] = useState('');
  const [shade, setShade] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentField, setCurrentFieldValue] = useState();
  const {colors} = useTheme();

  const setCurrentField = field => {
    setCurrentFieldValue(field);
    onFocus(index);
  };

  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    console.log('state changed', currentField);
    isRecording ? startRecording() : stopRecording();
  }, [isRecording]);

  const startRecording = async () => {
    Voice.onSpeechResults = resultHandler;
    // setCountBlend('');
    try {
      await Voice.destroy().then(Voice.removeAllListeners);
      await Voice.start('en-US').then(console.log('started'));
    } catch (e) {
      console.log('error', e);
    }
  };

  const resultHandler = e => {
    switch (currentField) {
      case 'countBlend':
        setCountBlend(e.value[0]);
        return;
      case 'color':
        setColor(e.value[0]);
        return;
      case 'shade':
        setShade(e.value[0]);
        return;
      case 'quantity':
        setQuantity(e.value[0]);
        return;
    }
    // setCountBlend(e.value[0]);
  };

  const startRecordingBlend = async field => {
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

  return (
    <>
      <View
        style={[
          styles.inputContainer,
          styles.shdow,
          {backgroundColor: colors.backgroundWhite},
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: canDelete ? 0.92 : 1, alignItems: 'flex-start'}}>
            <TextInput
              placeholder="Enter Count & Blend"
              style={styles.input}
              value={countBlend}
              onChangeText={text => setCountBlend(text)}
              onFocus={() => setCurrentField('countBlend')}
            />
          </View>
          {canDelete && (
            <View
              style={{
                flex: 0.08,
                alignItems: 'flex-end',
                margin: -7,
              }}>
              <TouchableOpacity onPress={() => onDelete(index)}>
                <Icon name="trash" color="#e11d48" size={20} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: canDelete ? 0.96 : 1, alignItems: 'flex-start'}}>
            <TextInput
              placeholder="Enter Color"
              style={styles.input}
              value={color}
              onChangeText={text => setColor(text)}
              onFocus={() => setCurrentField('color')}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: canDelete ? 0.96 : 1, alignItems: 'flex-start'}}>
            <TextInput
              placeholder="Enter Shade"
              style={styles.input}
              value={shade}
              onChangeText={text => setShade(text)}
              onFocus={() => setCurrentField('shade')}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: canDelete ? 0.96 : 1, alignItems: 'flex-start'}}>
            <TextInput
              placeholder="Enter Quantity"
              style={styles.input}
              value={quantity}
              onChangeText={text => setQuantity(text)}
              onFocus={() => setCurrentField('quantity')}
            />
          </View>
        </View>
      </View>
    </>
  );
};

EnquiryForm.propTypes = {
  canDelete: PropTypes.bool.isRequired,
  isRecording: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onFocus: PropTypes.func.isRequired,
};
export default EnquiryForm;
