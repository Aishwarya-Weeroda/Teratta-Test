import React from 'react';
import {Button, View} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Header, Content, Accordion} from 'native-base';

import SearchBar from '../Search/Search';

const dataArray = [
  {title: 'First Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Second Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
];

function Dashboard({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#cffafe',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '2%',
      }}>
      <SearchBar />
      <Accordion dataArray={dataArray} expanded={0} />
    </View>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Dashboard;
