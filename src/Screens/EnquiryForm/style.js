import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  shdow: {
    shadowColor: '#a8a29e',
    shadowOffset: {},
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 30,
  },
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 32,
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255, 0.9)',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#d6d3d1',
    borderRadius: 5,
    padding: 20,
    marginRight: 10,
    marginBottom: 5,
    width: '100%',
  },
  signInTxt: {fontSize: 16, textAlign: 'left'},
  inputView: {},
});

export {styles};
