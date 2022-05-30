import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');
export default StyleSheet.create({
  menuIcon: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    width: width / 1.1,
    padding: 15,
    borderRadius: 5,
  },
  loginBtnContainer: {alignItems: 'center', marginBottom: 10},
  loginTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'rgba(255,255,255, 0.9)',
    padding: 20,
    borderTopColor: 'red',
    borderRadius: 10,
  },
  shdow: {
    shadowColor: '#a8a29e',
    shadowOffset: {},
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 10,
  },
});
