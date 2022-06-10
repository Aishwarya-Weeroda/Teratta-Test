import {Typography, BaseColor} from '../../config';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOutline: Typography.caption1,
  textPrimary: StyleSheet.flatten([
    Typography.caption1,
    {color: BaseColor.whiteColor},
  ]),
});
