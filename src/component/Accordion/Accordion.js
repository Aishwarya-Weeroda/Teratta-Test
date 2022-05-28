import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../config';
import styles from './Style';
import Tag from '../Tag';

const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export default function Accordion({name, onBtnPress}) {
  const [collapseHour, setCollapseHour] = useState(true);
  const {colors} = useTheme();
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
          <View>
            <Text style={{color: colors.text}}>{name}</Text>
          </View>
          <View style={{padding: 7}}>
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
          paddingLeft: 40,
          paddingRight: 20,
          marginTop: 5,
          height: collapseHour ? 0 : null,
          overflow: 'hidden',
        }}>
        {products?.openTime?.map?.(item => {
          return (
            <View
              style={[styles.lineWorkHours, {borderColor: colors.border}]}
              key={item.label}>
              <Text style={{color: colors.text}}>{item.label}</Text>
              {!collapseHour && (
                <Tag onPress={onBtnPress} status>
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

const products = {
  openTime: [
    {
      label: 'Sunday',
      start: 12.0,
      end: 1.0,
    },
    {
      label: 'Monday',
      start: 12.0,
      end: 1.0,
    },
    {
      label: 'Tuesday',
      start: 12.0,
      end: 1.0,
    },
    {
      label: 'Wednesday',
      start: 12.0,
      end: 1.0,
    },
    {
      label: 'Thursday',
      start: 12.0,
      end: 1.0,
    },
    {
      label: 'Friday',
      start: 12.0,
      end: 1.0,
    },
    {
      label: 'Saturday',
      start: 12.0,
      end: 1.0,
    },
  ],
};
