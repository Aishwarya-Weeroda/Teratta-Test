import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');

export default StyleSheet.create({
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 32,
    justifyContent: 'center',
  },
  contain: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    height: 56,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginBtnContainer: {alignItems: 'center', marginBottom: 10},
  loginBtn: {
    // width: 100,
    padding: 15,
    borderRadius: 5,
  },
  loginTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
