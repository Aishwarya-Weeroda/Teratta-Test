import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import TextInput from '../../component/TextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import filter from 'lodash/filter';
import styles from './style';
import AgentSelect from '../Receipient';
import {createRFQs, getRFQs} from '../../Redux/Features/RFQsSlice';
import {getSuppliersByOrg} from '../../Redux/Features/AgentsSlice';

export default function CreateRFQ({navigation, route}) {
  const {colors} = useTheme();
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState('');
  const enquiry = route?.params?.enquiry;
  const suppliers = useSelector(state => state.agents.suppliers);
  const [modalVisible, setModalVisible] = useState(false);
  const [suppliersDatas, setSupplierDatas] = useState(suppliers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuppliersByOrg());
  }, []);

  useEffect(() => {
    setSupplierDatas(suppliers);
  }, [suppliers]);

  const onChildPress = (item, parentId) => {
    const newSupplierDatas = JSON.parse(JSON.stringify(suppliersDatas));
    newSupplierDatas
      .filter(supplier => supplier.orgId === parentId)
      .map(supplier => {
        supplier.suppliers
          .filter(user => user._id === item._id)
          .map(user => (user.selected = !user.selected));
        const selectedCount = filter(supplier.suppliers, function (o) {
          return o.selected;
        });
        if (selectedCount.length === supplier.suppliers.length) {
          supplier.selected = true;
          supplier.partialSeclection = false;
        } else if (selectedCount.length > 0) {
          supplier.selected = false;
          supplier.partialSeclection = true;
        } else {
          supplier.partialSeclection = false;
          supplier.selected = false;
        }
      });
    setSupplierDatas(newSupplierDatas);
  };

  const onAccPress = item => {
    const newSupplierDatas = JSON.parse(JSON.stringify(suppliersDatas));
    newSupplierDatas
      .filter(supplier => supplier.orgId === item.orgId)
      .map(supplier => {
        if (item.selected) {
          supplier.selected = false;
          supplier.partialSeclection = false;
          return supplier.suppliers.map(user => (user.selected = false));
        } else if (!item.selected || item.partialSeclection) {
          supplier.selected = true;
          return supplier.suppliers.map(user => (user.selected = true));
        }
      });
    setSupplierDatas(newSupplierDatas);
  };

  const getRecepients = () =>
    suppliersDatas
      .filter(
        supplierData => supplierData.selected || supplierData.partialSeclection,
      )
      .map(data =>
        data.suppliers
          .filter(supplier => supplier.selected)
          .map(supplier => ({
            userId: supplier.userId,
            email: supplier.email,
            userName: supplier.userName,
            orgId: data.orgId,
          })),
      )
      .map(obj => ({[obj[0].orgId]: obj}));

  const onSubmit = () => {
    setModalVisible(false);
    const recepients = getRecepients();
    const data = {
      name: Date(),
      description: 'RFQ Enquiry description',
      attributes: enquiry.attributes,
      suppliers: recepients,
      enquiryDetailId: enquiry.enqDetailId,
    };
    console.log('recepients', data);
    if (recepients.length > 0) {
      dispatch(createRFQs(data))
        .unwrap()
        .then(() => {
          dispatch(getRFQs());
          navigation.navigate('AgentHome', {tab: 'RFQ'});
        });
    }
  };

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
      <AgentSelect
        isVisible={modalVisible}
        onAccPress={onAccPress}
        onChildPress={onChildPress}
        data={suppliersDatas}
        setModalVisible={setModalVisible}
        onSubmit={onSubmit}
        type="suppliers"
      />
      <Header
        title="Create RFQ"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-back-outline"
              size={30}
              color={colors.primary}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <View style={{flex: 4}}>
          <ScrollView scrollEventThrottle={8}>
            <View style={[styles.content]}>
              <View style={styles.wrapContent}>
                {enquiry.attributes?.map((attribute, index) =>
                  renderAttributes(attribute, index),
                )}
                <View key="Rate" style={styles.contentTitle}>
                  <Text headline>Rate</Text>
                </View>
                <TextInput
                  key="Enter Rate 3"
                  placeholder="Enter Rate"
                  value={rate}
                  onChangeText={text => setRate(text)}
                />
                <View key="Amount" style={styles.contentTitle}>
                  <Text headline>Amount</Text>
                </View>
                <TextInput
                  key="Enter Amount 1"
                  placeholder="Enter Amount"
                  value={amount}
                  onChangeText={text => setAmount(text)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <LinearGradient
            style={styles.loginBtn}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.primary, colors.secondary]}>
            <Text style={styles.loginTxt}>Create</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
