import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../config';
import styles from './Style';
import Text from '../../component/Text';

export default function Card({status, onBtnPress, data}) {
  const {colors} = useTheme();
  const getStatusColor = () => {
    switch (status) {
      case 'Completed':
        return '#16a34a';
      case 'In Progress':
        return '#fdba74';
      case 'Declined':
        return '#b91c1c';
      default:
        return '#22d3ee';
    }
  };

  return (
    <View
      style={[
        styles.cardShdow,
        {
          marginHorizontal: 5,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.line,
          {
            backgroundColor: colors.background,
            borderRadius: 5,
            height: 45,
            borderColor: colors.border,
            borderLeftColor: getStatusColor(),
            borderLeftWidth: 4,
          },
        ]}
        onPress={onBtnPress}>
        <View style={styles.contentInforAction}>
          <View style={{flex: 0.93}}>
            <Text style={{color: colors.text}} numberOfLines={1}>
              {data.name}
            </Text>
          </View>
          <View style={{flex: 0.07}}>
            <Icon name="chevron-forward" size={24} color={colors.primary} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
