import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../config';
import styles from './Style';
import Tag from '../Tag';
import Text from '../../component/Text';

const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export default function Accordion({name, onBtnPress, data}) {
  const [collapseHour, setCollapseHour] = useState(true);
  const {colors} = useTheme();

  const getStatusColor = status => {
    switch (status) {
      case 'Completed':
        return '#16a34a';
      case 'In Progress':
        return '#ea580c';
      case 'Declined':
        return '#b91c1c';
      default:
        return '#22c55e';
    }
  };

  /**
   * collapse open time
   */
  const onCollapse = () => {
    enableExperimental();
    setCollapseHour(!collapseHour);
  };

  return (
    <View
      style={[
        styles.shdow,
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
          },
        ]}
        onPress={onCollapse}>
        <View style={styles.contentInforAction}>
          <View style={{flex: 0.9}}>
            <Text style={{color: colors.text}} numberOfLines={1}>
              {name}
            </Text>
          </View>
          <View style={{flex: 0.1, padding: 7}}>
            <Icon
              name={collapseHour ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={colors.primary}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 5,
          height: collapseHour ? 0 : null,
          overflow: 'hidden',
        }}>
        {data?.map?.((item, index) => {
          return (
            <View
              style={[styles.lineWorkHours, {borderColor: colors.border}]}
              key={item.name + index}>
              <View style={styles.textStyle}>
                <Text style={{color: colors.text}} numberOfLines={1}>
                  {item.name}
                </Text>
                <Icon
                  name={
                    item.status === 'Declined'
                      ? 'close-circle-outline'
                      : 'checkmark-circle-outline'
                  }
                  size={15}
                  color={getStatusColor(item.status)}
                />
              </View>

              {!collapseHour && (
                <Tag onPress={() => onBtnPress(data, item.name)} status>
                  view
                </Tag>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
