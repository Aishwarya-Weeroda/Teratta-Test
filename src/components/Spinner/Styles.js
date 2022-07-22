import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    color: 'blue',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activitystyle: {
    marginTop: 35,
  },
  text: {
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    width: '30%',
    height: '15%',
    shadowColor: '#a8a29e',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 5,
    shadowRadius: 3.5,
    borderRadius: 10,
    opacity: 0.8,
    elevation: 20,
  },
});

export default styles;
