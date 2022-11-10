import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
    };
  }

  setDates = dates => {
    this.setState({
      ...dates,
    });
  };

  render() {
    const {startDate, endDate, displayedDate} = this.state;
    const {name, colors} = this.props;
    return (
      <View style={styles.container}>
        <DateRangePicker
          monthButtonsStyle={{tintColor: colors.primary}}
          selectedStyle={{backgroundColor: colors.primary}}
          onChange={this.setDates}
          endDate={endDate}
          startDate={startDate}
          displayedDate={displayedDate}
          range>
          <Text>{name}</Text>
        </DateRangePicker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
