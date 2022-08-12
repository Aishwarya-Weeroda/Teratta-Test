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
import styles from './style';
import Text from '../../component/Text';

const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export default function SelectAgents({onAccPress, onChildPress, data, type}) {
  const [collapseHour, setCollapseHour] = useState(true);
  const {colors} = useTheme();
  const onCollapse = () => {
    enableExperimental();
    setCollapseHour(!collapseHour);
  };
  return (
    <View
      style={[
        styles.accShdow,
        {
          marginHorizontal: 5,
        },
      ]}>
      <View
        style={[
          styles.line,
          {
            backgroundColor: colors.background,
            borderRadius: 5,
            height: 45,
            borderColor: colors.border,
          },
        ]}>
        <View style={styles.contentInforAction}>
          <View style={{flex: 0.8}}>
            <Text style={{color: colors.text}} numberOfLines={1}>
              {data.name}
            </Text>
          </View>
          <View style={{flex: 0.1, padding: 7}}>
            <TouchableOpacity onPress={onCollapse}>
              <Icon
                name={collapseHour ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.1, padding: 3}}>
            <TouchableOpacity onPress={() => onAccPress(data)}>
              <Icon
                name={
                  data.selected
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'
                }
                size={20}
                color={
                  data.selected || data.partialSeclection
                    ? colors.primary
                    : colors.border
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 5,
          height: collapseHour ? 0 : null,
          overflow: 'hidden',
        }}>
        {data?.[type]?.map?.((item, index) => {
          return (
            <View
              style={[styles.lineWorkHours, {borderColor: colors.border}]}
              key={item.userId + index}>
              <View style={styles.textStyle}>
                <Text style={{color: colors.text}} numberOfLines={1}>
                  {item.email}
                </Text>
              </View>

              {!collapseHour && (
                <TouchableOpacity onPress={() => onChildPress(item)}>
                  <Icon
                    name={
                      item.selected
                        ? 'checkmark-circle'
                        : 'checkmark-circle-outline'
                    }
                    size={18}
                    color={item.selected ? colors.primary : colors.border}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
