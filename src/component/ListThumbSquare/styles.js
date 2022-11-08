import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  item: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomEndRadius: 4,
  },
  contain: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: 'darkblue',
    borderBottomRightRadius: 4,
    elevation: 2,
    shadowColor: '#a8a29e',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
  },
  thumb: {width: 48, height: 50, marginRight: 10, marginLeft: 10},
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 7.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  right: {
    flex: 2.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
