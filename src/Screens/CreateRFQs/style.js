import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');
import {BaseColor} from '../../config';

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
    backgroundColor: 'rgba(255,255,255, 0.9)',
    padding: 10,
    borderTopColor: 'red',
    borderRadius: 5,
  },
  shdow: {
    shadowColor: '#a8a29e',
    shadowOffset: {},
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },
  contain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    borderRadius: 8,
    alignItems: 'center',
  },
  wrapContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  wrapBadgeContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  contentButton: {
    borderTopWidth: 0.5,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
  },
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 32,
    justifyContent: 'center',
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.grayColor,
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  checkBoxView: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 10,
  },
  forgotBoxView: {
    flex: 0.2,
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 5,
  },
});
