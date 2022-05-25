import React from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from '../../component/Accordion/Accordion';
import DashButton from '../../component/DashButton/DashButton';
const colors = {
  primary: '#E5634D',
  primaryDark: '#C31C0D',
  primaryLight: '#FF8A65',
  accent: '#4A90A4',
  background: 'white',
  card: '#F5F5F5',
  text: '#212121',
  border: '#c7c7cc',
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchForm: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  lineForm: {
    width: 1,
    height: '100%',
    margin: 10,
  },
});
export default function Home({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center', marginTop: 5}}>
          <DashButton />
        </View>
      </View>
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
          <TextInput placeholder="search" body1 grayColor style={{flex: 1}} />
          <View style={{paddingVertical: 8}}>
            <View style={[styles.lineForm, {backgroundColor: colors.border}]} />
          </View>
          <TouchableOpacity>
            <Icon name="md-search" size={18} color="#02aab0" />
          </TouchableOpacity>
        </View>
      </View>
      <Accordion name="Accordion 1" />
      <Accordion name="Accordion 2" />
      <Accordion name="Accordion 3" />
      <Accordion name="Accordion 4" />
    </View>
  );
}
