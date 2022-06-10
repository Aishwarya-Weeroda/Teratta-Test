import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Image from '../Image';
import Text from '../Text';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';
export default function ListThumbSquare(props) {
  const {colors} = useTheme();
  const {
    style,
    loading,
    imageStyle,
    image,
    txtLeftTitle,
    txtContent,
    txtRight,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.item, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={[styles.contain, {borderBottomColor: colors.border}]}>
        <Image source={image} style={[styles.thumb, imageStyle]} />
        <View style={styles.content}>
          <View style={styles.left}>
            <Text headline semibold>
              {txtLeftTitle}
            </Text>
            <Text
              note
              numberOfLines={1}
              footnote
              grayColor
              style={{
                paddingTop: 5,
              }}>
              {txtContent}
            </Text>
          </View>
          <View style={styles.right}>
            <Text caption2 grayColor numberOfLines={1}>
              {txtRight}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

ListThumbSquare.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  imageStyle: PropTypes.object,
  image: PropTypes.object.isRequired,
  txtLeftTitle: PropTypes.string,
  txtContent: PropTypes.string,
  txtRight: PropTypes.string,
  onPress: PropTypes.func,
};

ListThumbSquare.defaultProps = {
  style: {},
  loading: false,
  imageStyle: {},
  image: '',
  txtLeftTitle: '',
  txtContent: '',
  txtRight: '',
  onPress: () => {},
};
