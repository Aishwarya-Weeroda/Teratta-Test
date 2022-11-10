import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import {useTheme} from '../../config';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Search() {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.searchForm,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          shadowColor: colors.border,
        },
        {marginTop: 10},
      ]}>
      <View style={[styles.textInput, {backgroundColor: colors.card}]}>
        <TextInput
          selectionColor={colors.primary}
          placeholder="search"
          style={{flex: 1, color: colors.text}}
        />
        <View style={{paddingVertical: 8}}>
          <View style={[styles.lineForm, {backgroundColor: colors.border}]} />
        </View>
        <TouchableOpacity>
          <Icon name="md-search" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
