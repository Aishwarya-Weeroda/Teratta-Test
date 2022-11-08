import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {useTheme} from '../../config';
import Modal from 'react-native-modal';
import NewMessages from './newMessage';

export default function Chats(props) {
  const {colors} = useTheme();
  const {id, style, isVisible, setModalVisible} = props;

  return (
    <View
      style={[styles.container, {backgroundColor: colors.background}, style]}>
      <Modal
        isVisible={isVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        swipeDirection={['left', 'right','down']}
        style={styles.bottomModal}>
        <View
          style={[
            styles.contentFilterBottom,
            {flex: 1, backgroundColor: colors.background},
          ]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <NewMessages id={id} />
        </View>
      </Modal>
    </View>
  );
}
