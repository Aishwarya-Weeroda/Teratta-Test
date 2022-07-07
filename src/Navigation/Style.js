import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  shdow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  customBtn: {
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: '#e32f45',
  },
  tabBarStyle: {
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    borderRadius: 15,
    height: 90,
  },
  topTabBarStyle: {
    elevation: 2,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'android' ? 0 : 10,
  },
  topSafeArea: {
    flex: 0,
  },
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sendIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
