import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  shdow: {
    shadowColor: '#a8a29e',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 10,
  },
  container: {
    width: '100%',
    height: height / 3,
  },
  centerAlign: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width / 2,
    height: height / 3,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255, 0.9)',
    padding: 20,
    marginTop: -height / 1.6,
    borderRadius: 20,
    width: width / 1.1,
    height: height / 2,
  },
  input: {
    // textAlign: 'center',
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#d6d3d1',
    borderRadius: 5,
    width: width / 1.2,
    padding: 10,
    marginVertical: 15,
  },
  loginBtnContainer: {alignItems: 'center', marginTop: 20},
  loginBtn: {
    width: width / 1.25,
    padding: 15,
    borderRadius: 5,
  },
  loginTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    marginTop: 2,
    backgroundColor: 'rgba(210,210,210,0)',
    height: height,
  },
  signInTxt: {fontSize: 20, textAlign: 'center'},
  inputView: {marginTop: 30, marginBottom: 10},
  rowDir: {flexDirection: 'row'},
  checkBoxView: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkBox: {width: 20, height: 20, borderColor: '#aaa'},
  marginLeft8: {marginLeft: 8},
  forgotBoxView: {flex: 0.5, alignItems: 'flex-end'},
  forgotPwdTxt: {color: '#be185d'},
});

export {styles};
