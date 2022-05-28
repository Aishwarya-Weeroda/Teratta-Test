import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from '../../component/Accordion/Accordion';
import {useTheme} from '../../config';
import Header from '../../component/Header/Header';

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
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header title="Enquiry" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
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
                <View
                  style={[styles.lineForm, {backgroundColor: colors.border}]}
                />
              </View>
              <TouchableOpacity>
                <Icon name="md-search" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <Accordion
            onBtnPress={() => navigation.navigate('Modal')}
            name="Accordion 1"
          />
          <Accordion name="Accordion 2" />
          <Accordion name="Accordion 3" />
          <Accordion name="Accordion 4" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
