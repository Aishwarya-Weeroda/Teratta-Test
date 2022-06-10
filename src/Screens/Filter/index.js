import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Utils from '../../utils';
import styles from './style';
import Header from '../../component/Header/Header';
import Text from '../../component/Text';
import Tag from '../../component/Tag';
import {categories, dateFilter, users} from '../../data/filter';
import DatePicker from '../../component/DatePicker';

export default function Filter({navigation, route}) {
  const {colors} = useTheme();
  const filter = route?.params?.filter;

  const [selectedCategory, setCategory] = useState(filter?.category ?? []);
  const [selectedDate, setDate] = useState(filter?.date ?? []);
  const [selectedFacilities, setFacilities] = useState(filter?.feature ?? []);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  /**
   * on Apply filter
   *
   */
  const onApply = () => {
    // filter.category = selectedCategory;
    // filter.feature = selectedFacilities;
    // route.params?.onApply?.(filter);
    navigation.goBack();
  };

  /**
   * @description Called when filtering option > category
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  const onSelectCategory = select => {
    const exist = selectedCategory.some(item => item.id === select.id);
    if (exist) {
      setCategory(selectedCategory.filter(item => item.id != select.id));
    } else {
      setCategory(selectedCategory.concat(select));
    }
  };

  /**
   * @description Called when filtering option > category
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  const onSelectDate = select => {
    const exist = selectedDate.some(item => item.id === select.id);
    if (exist) {
      setDate(selectedDate.filter(item => item.id != select.id));
    } else {
      setDate(selectedDate.concat(select));
    }
  };

  /**
   * on select Feature
   * @param {*} select
   */
  const onSelectFeature = select => {
    const exist = selectedFacilities.some(item => item.id === select.id);
    if (exist) {
      setFacilities(selectedFacilities.filter(item => item.id != select.id));
    } else {
      setFacilities(selectedFacilities.concat(select));
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="filtering"
        renderLeft={() => {
          return <Icon name="chevron-back" size={25} color={colors.primary} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              apply
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => onApply()}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
          }>
          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Text headline semibold>
              Category
            </Text>
            <View style={styles.wrapContent}>
              {categories?.map?.(item => {
                const selected = selectedCategory.some(i => i.id === item.id);
                return (
                  <Tag
                    primary={selected}
                    outline={!selected}
                    key={item.id.toString()}
                    style={{
                      marginTop: 8,
                      marginRight: 8,
                    }}
                    onPress={() => onSelectCategory(item)}>
                    {item.title}
                  </Tag>
                );
              })}
            </View>
            <Text headline semibold style={{marginTop: 20}}>
              Users
            </Text>
            <View style={styles.wrapContent}>
              {users?.map?.(item => {
                const selected = selectedFacilities.some(i => i.id === item.id);
                return (
                  <Tag
                    onPress={() => onSelectFeature(item)}
                    icon={
                      <Icon
                        name="people"
                        size={12}
                        color={colors.accent}
                        solid
                        style={{marginRight: 5}}
                      />
                    }
                    chip
                    key={item.id.toString()}
                    style={{
                      marginTop: 8,
                      marginRight: 8,
                      borderColor: selected ? colors.primary : colors.accent,
                    }}>
                    {item.title}
                  </Tag>
                );
              })}
            </View>
            <Text headline semibold style={{marginTop: 20}}>
              Date Range
            </Text>
            <View style={styles.wrapContent}>
              {dateFilter?.map?.(item => {
                const selected = selectedDate.some(i => i.id === item.id);
                return (
                  <Tag
                    primary={selected}
                    outline={!selected}
                    key={item.id.toString()}
                    style={{
                      marginTop: 8,
                      marginRight: 8,
                    }}
                    onPress={() => onSelectDate(item)}>
                    {item.title}
                  </Tag>
                );
              })}
            </View>
            <View style={styles.wrapContent}>
              <DatePicker colors={colors} name="Custom Date" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
