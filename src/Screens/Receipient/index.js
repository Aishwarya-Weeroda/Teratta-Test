import React from 'react';
import {View, ScrollView} from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import {useTheme} from '../../config';
import Modal from 'react-native-modal';
import SelectAgents from '../Enquiry/SelectAgents';
import Button from '../../component/Button';

export default function AgentSelect(props) {
  const {colors} = useTheme();
  const {
    style,
    isVisible,
    data,
    onAccPress,
    onChildPress,
    setModalVisible,
    onSubmit,
  } = props;
  return (
    <View
      style={[
        styles.contain,
        {backgroundColor: colors.background, maxHeight: '25%'},
        style,
      ]}>
      <Modal
        isVisible={isVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <ScrollView scrollEventThrottle={8}>
            {data.map((agentData, index) => (
              <SelectAgents
                onAccPress={onAccPress}
                onChildPress={childItem =>
                  onChildPress(childItem, agentData.id)
                }
                data={agentData}
                key={agentData.id + index}
              />
            ))}
          </ScrollView>
          <View style={{paddingHorizontal: 20}}>
            <Button
              full
              style={{
                marginTop: 10,
                marginBottom: 20,
                backgroundColor: colors.primary,
              }}
              onPress={onSubmit}>
              Send
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

AgentSelect.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  sortSelected: PropTypes.object,
  onChangeSort: PropTypes.func,
  onChangeView: PropTypes.func,
  onFilter: PropTypes.func,
  isVisible: PropTypes.bool,
};

AgentSelect.defaultProps = {
  style: {},
  sortSelected: null,
  onChangeSort: () => {},
  onChangeView: () => {},
  onFilter: () => {},
  isVisible: false,
};
