import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import Tag from '../../component/Tag';
import TextInput from '../../component/TextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import Chats from './chats';

export default function EnquiryDetails({navigation, route}) {
  const {colors} = useTheme();
  const enquiry = route?.params?.enquiry;
  const [modalVisible, setModalVisible] = useState(false);

  const renderAttributes = (attribute, index) => (
    <>
      <View style={styles.contentTitle} key={attribute.id + index}>
        <Text headline>{attribute.name}</Text>
      </View>
      <TextInput
        key={attribute.value + index}
        editable={false}
        placeholder="Enter Count & Blend"
        value={attribute.value}
      />
    </>
  );
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="Enquiry Details"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-back-outline"
              size={30}
              color={colors.primary}
            />
          );
        }}
        renderRight={() => {
          return <Tag declined> Decline </Tag>;
        }}
        onPressRight={() => console.log('ascbasmhcb')}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Chats
        id={enquiry.enqDetailId}
        isVisible={modalVisible} 
        setModalVisible={setModalVisible}
        onSubmit={() => {}}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <ScrollView scrollEventThrottle={8}>
          <View style={[styles.content]}>
            <View style={styles.wrapContent}>
              {enquiry.attributes?.map((attribute, index) =>
                renderAttributes(attribute, index),
              )}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.menuIcon, {backgroundColor: colors.primary}]}>
          <Icon name="chatbox-ellipses-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Create RFQ', {enquiry})}>
          <LinearGradient
            style={styles.loginBtn}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.primary, colors.secondary]}>
            <Text style={styles.loginTxt}>Create RFQ</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
