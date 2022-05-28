import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Avatar} from 'native-base';
import styles from './DetailsStyle';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../../config';

const BaseColor = {
  grayColor: '#9B9B9B',
  dividerColor: '#BDBDBD',
  whiteColor: '#FFFFFF',
  fieldColor: '#F5F5F5',
  yellowColor: '#FDC60A',
  navyBlue: '#3C5A99',
  kashmir: '#5D6D7E',
  orangeColor: '#E5634D',
  blueColor: '#5DADE2',
  pinkColor: '#A569BD',
  greenColor: '#58D68D',
};

export default function ProfileDetail(props) {
  const {colors} = useTheme();
  const {
    style,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    textFirst,
    point,
    textSecond,
    textThird,
    icon,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={[styles.contentLeft, styleLeft]}>
        <View>
          <Avatar
            style={[styles.thumb, styleThumb]}
            bg="purple.600"
            alignSelf="center"
            size="xl"
            source={{
              uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}>
            RB
          </Avatar>
          <View style={[styles.point, {backgroundColor: colors.primary}]}>
            <Text style={{color: '#fff'}}>{point}</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: colors.text}}>{textFirst}</Text>
          <Text
            body2
            style={{
              marginTop: 3,
              paddingRight: 10,
              color: colors.text,
            }}
            numberOfLines={1}>
            {textSecond}
          </Text>
          <Text style={{color: colors.text}}>{textThird}</Text>
        </View>
      </View>
      {icon && (
        <View style={[styles.contentRight, styleRight]}>
          <Icon
            name="angle-right"
            size={18}
            color={BaseColor.grayColor}
            enableRTL={true}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.number,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
};

ProfileDetail.defaultProps = {
  image: '',
  textFirst: '',
  textSecond: '',
  icon: false,
  point: '',
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {},
};
