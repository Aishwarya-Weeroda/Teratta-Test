import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  shdow: {
    shadowColor: '#a8a29e',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
  },
  cardShdow: {
    shadowColor: '#a8a29e',
    shadowOffset: {
      // width: 1,
      // height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 10,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderColor: '#fecaca',
    elevation: 5,
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
    // alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  textStyle: {
    flex: 0.9,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  safeAreaView: {
    flex: 1,
  },
});
