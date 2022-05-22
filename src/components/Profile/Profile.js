import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from 'native-base';

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#02aab0', '#00cdac']}
          style={styles.header}></LinearGradient>
        <Avatar
          style={styles.avatar}
          bg="purple.600"
          alignSelf="center"
          size="xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}>
          RB
        </Avatar>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text
              style={{
                color: '#696969',
                textAlign: 'center',
                // fontWeight: 'bold',
                fontSize: 30,
                marginTop: 20,
              }}>
              Marry Lin
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    // flex: 1,
    // alignItems: 'center',
    // padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#cffafe',
  },
});
