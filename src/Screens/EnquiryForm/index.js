import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './style';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-community/voice';
import {useTheme} from '../../config';

const EnquiryForm = ({
  onDelete,
  index,
  canDelete,
  isRecording,
  fields,
  onChangeText,
  onFocus,
}) => {
  const currentEle = {
    id: null,
    index: null,
  };
  const [currentElement, setCurrentElement] = useState(currentEle);
  const {colors} = useTheme();

  const setFocus = currentEle => {
    setCurrentElement(currentEle);
    onFocus(index);
  };

  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    isRecording ? startRecording() : stopRecording();
  }, [isRecording]);

  const startRecording = async () => {
    Voice.onSpeechResults = resultHandler;
    try {
      await Voice.destroy().then(Voice.removeAllListeners);
      await Voice.start('en-US').then(console.log('started'));
    } catch (e) {
      console.log('error', e);
    }
  };

  const resultHandler = e => {
    onChangeText(currentElement.id, e.value[0], currentElement.index);
  };

  const stopRecording = async () => {
    try {
      await Voice.stop().then(console.log('stoped'));
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderInput = (field, childIndex) => (
    <View style={{flexDirection: 'row'}} key={index + childIndex}>
      <View style={{flex: canDelete ? 0.96 : 1, alignItems: 'flex-start'}}>
        <TextInput
          placeholder={field.name}
          style={styles.input}
          multiline={true}
          value={field.value}
          onChangeText={text => onChangeText(field.id, text, childIndex)}
          onFocus={() => setFocus({id: field.id, index: childIndex})}
        />
      </View>
      {canDelete && childIndex === 0 && (
        <View
          style={{
            flex: 0.08,
            alignItems: 'flex-end',
            margin: -7,
          }}>
          <TouchableOpacity onPress={onDelete}>
            <Icon name="trash" color="#e11d48" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View
      style={[
        styles.inputContainer,
        styles.shdow,
        {backgroundColor: colors.backgroundWhite},
      ]}>
      {fields.map((field, childIndex) => renderInput(field, childIndex))}
    </View>
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
