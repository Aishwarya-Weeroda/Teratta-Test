import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  UIManager,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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

const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export default function Accordion({name}) {
  const [collapseHour, setCollapseHour] = useState(true);

  /**
   * collapse open time
   */
  const onCollapse = () => {
    enableExperimental();
    setCollapseHour(!collapseHour);
  };

  return (
    <View
      style={{
        marginHorizontal: 5,
      }}>
      <TouchableOpacity
        style={[
          styles.line,
          {backgroundColor: '#e7e5e4', borderRadius: 5, height: 40},
        ]}
        onPress={onCollapse}>
        <View style={styles.contentInforAction}>
          <View>
            <Text>{name}</Text>
          </View>
          <View style={{padding: 7}}>
            <Icon
              name={collapseHour ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#02aab0"
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
              <Text>{item.label}</Text>
              <Text>{`${item.start} - ${item.end}`}</Text>
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

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderColor: '#fecaca',
  },
  contentInforAction: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  lineWorkHours: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  safeAreaView: {
    flex: 1,
  },
});
