import {StyleSheet} from 'react-native';

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
    top: -30,
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
    // position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    borderRadius: 15,
    height: 90,
  },
  topTabBarStyle: {
    // backgroundColor: 'red',
    elevation: 2,
    // borderRadius: 15,
  },
  icon: {alignItems: 'center', justifyContent: 'center', top: 10},
  topSafeArea: {
    flex: 0,
  },
});
