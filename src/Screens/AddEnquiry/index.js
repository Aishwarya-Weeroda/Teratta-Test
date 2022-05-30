import React from 'react';
import Text from '../../component/Text';
import TextInput from '../../component/TextInput';
import {TouchableOpacity, View} from 'react-native';
import {useTheme, BaseColor} from '../../config';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChooseBusiness({navigation}) {
  const {colors} = useTheme();
  /**
   *
   * onSave ChooseBusiness
   */
  const onSaveBusiness = () => {
    navigation.goBack();
  };

  const icon = (
    <Icon name="mic-sharp" size={20} color={colors.text} enableRTL={true} />
  );

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
            icon={icon}
          />
          <View style={styles.contentTitle}>
            <Text headline>Color</Text>
          </View>
          <TextInput
            placeholder="Enter Color"
            style={{backgroundColor: '#e7e5e4'}}
            icon={icon}
          />
          <View style={styles.contentTitle}>
            <Text headline>Shade</Text>
          </View>
          <TextInput
            placeholder="Enter Shade"
            style={{backgroundColor: '#e7e5e4'}}
            icon={icon}
          />
          <View style={styles.contentTitle}>
            <Text headline>Quantity</Text>
          </View>
          <TextInput
            placeholder="Enter Quantity"
            style={{backgroundColor: '#e7e5e4'}}
            icon={icon}
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
              done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
