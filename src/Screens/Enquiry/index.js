import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import filter from 'lodash/filter';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-community/voice';
import styles from './style';
import EnquiryForm from '../EnquiryForm';
import Agents from '../../data/Agents';
import SelectAgents from './SelectAgents';

export default function Messages({navigation}) {
  const {colors} = useTheme();

  const enquiry = {
    countBlend: null,
    color: null,
    shade: null,
    quantity: null,
  };
  const [enquiryForms, setEnquiryForms] = useState([enquiry]);

  const datas = [
    {
      id: 1,
      org: 'Royal Yarns',
      selected: false,
    },
    {
      id: 2,
      org: 'Shanmugam Yarns',
      selected: false,
    },
    {
      id: 3,
      org: 'Test Yarns',
      selected: false,
    },
    {
      id: 4,
      org: 'Test1 Yarns',
      selected: false,
    },
    {
      id: 5,
      org: 'Test2 Yarns',
      selected: false,
    },
    {
      id: 6,
      org: 'Test3 Yarns',
      selected: false,
    },
  ];

  const [data, setData] = useState(datas);

  const getIcon = (field, method) => (
    <TouchableOpacity onPress={() => method(field)}>
      <Icon name="mic-sharp" size={20} color={colors.text} enableRTL={true} />
    </TouchableOpacity>
  );

  const fontIcon = (
    <TouchableOpacity onPress={() => stopRecording()}>
      <Icon
        name="stop-circle-outline"
        size={20}
        color={colors.primary}
        enableRTL={true}
      />
    </TouchableOpacity>
  );
  const [countBlend, setCountBlend] = useState('');
  const [color, setColor] = useState('');
  const [shade, setShade] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentField, setCurrentField] = useState();
  const [currentIdex, setCurrentindex] = useState();
  const [isRecording, setRecording] = useState(false);
  const [stopRecording, setStopRecording] = useState(false);
  const [agentDatas, setAgentDatas] = useState(Agents);
  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onselect = (id, recipient) => {
    const newData = [...data];
    newData
      .filter(item => item.id === recipient.id)
      .map(item => (item.selected = !item.selected));
    setData(newData);
  };

  const renderRecipient = recipient => {
    return (
      <View style={{flex: 1}} key={recipient.org}>
        <TouchableOpacity
          key={recipient.id}
          onPress={() => onselect(recipient.id, recipient)}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.checkBoxView}>
              <Text>{recipient.org}</Text>
            </View>
            <View style={styles.forgotBoxView}>
              {recipient.selected && (
                <Icon
                  name="checkmark-circle"
                  color={colors.primary}
                  size={17}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const onRecordStart = () => {
    setRecording(!isRecording);
  };
  const onRecordEnd = () => {
    setRecording(false);
  };
  const AddForm = ({children, onPress}) => {
    return (
      <TouchableOpacity
        style={[styles.shdow, styles.customBtn]}
        onPress={onPress}>
        <LinearGradient
          style={styles.gradientStyle}
          colors={[colors.primary, colors.secondary]}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {children}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const RecordingBtn = ({children}) => {
    return (
      <TouchableOpacity
        style={[styles.shdow, styles.customBtn]}
        onPress={onRecordStart}>
        <LinearGradient
          style={styles.gradientStyle}
          colors={[colors.primary, colors.secondary]}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {children}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const addEnquiryForm = () => {
    const newEnquiryForms = [...enquiryForms];
    newEnquiryForms.push(enquiry);
    setEnquiryForms(newEnquiryForms);
  };
  const onDelete = index => {
    const newEnquiryForms = [...enquiryForms];
    newEnquiryForms.splice(index, 1);
    setEnquiryForms(newEnquiryForms);
  };

  const onChildPress = (item, parentId) => {
    const newAgentDatas = [...agentDatas];
    newAgentDatas
      .filter(agent => agent.id === parentId)
      .map(agent => {
        agent.agents
          .filter(user => user.id === item.id)
          .map(user => (user.selected = !user.selected));
        const selectedCount = filter(agent.agents, function (o) {
          return o.selected;
        });
        if (selectedCount.length === agent.agents.length) {
          agent.selected = true;
          agent.partialSeclection = false;
        } else if (selectedCount.length > 0) {
          agent.selected = false;
          agent.partialSeclection = true;
        } else {
          agent.partialSeclection = false;
          agent.selected = false;
        }
      });
    setAgentDatas(newAgentDatas);
  };

  const onAccPress = item => {
    const newAgentDatas = [...agentDatas];
    newAgentDatas
      .filter(agent => agent.id === item.id)
      .map(agent => {
        if (item.selected) {
          agent.selected = false;
          return agent.agents.map(user => (user.selected = false));
        } else if (!item.selected || item.partialSeclection) {
          agent.selected = true;
          return agent.agents.map(user => (user.selected = true));
        }
      });
    setAgentDatas(newAgentDatas);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="Add Enquiry"
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
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}>
        <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
          <View style={{flex: 1}}>
            <ScrollView>
              {enquiryForms.map((enquiryForm, index) => (
                <EnquiryForm
                  key={index}
                  canDelete={enquiryForms.length > 1}
                  index={index}
                  onDelete={onDelete}
                  onFocus={setCurrentindex}
                  isRecording={currentIdex === index && isRecording}
                />
              ))}
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{flex: 0.5, alignItems: 'flex-end', marginRight: 15}}>
                  <TouchableOpacity onPress={onRecordStart}>
                    <Icon
                      name={
                        isRecording
                          ? 'stop-circle-outline'
                          : 'mic-circle-outline'
                      }
                      size={40}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                  <TouchableOpacity onPress={addEnquiryForm}>
                    <Icon
                      name="add-circle-outline"
                      size={40}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <View style={{padding: 3, maxHeight: '30%', marginBottom: 25}}>
        <View style={[styles.contentTitle, {marginHorizontal: 10}]}>
          <Text headline>Select Agents</Text>
        </View>
        <ScrollView scrollEventThrottle={8}>
          {agentDatas.map((agentData, index) => (
            <SelectAgents
              onAccPress={onAccPress}
              onChildPress={childItem => onChildPress(childItem, agentData.id)}
              data={agentData}
              key={agentData.id + index}
            />
          ))}
        </ScrollView>
      </View>
      <View style={[styles.loginBtnContainer, styles.shdow]}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => navigation.navigate('AddRecipient')}>
          <LinearGradient
            style={styles.loginBtn}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.primary, colors.secondary]}>
            <Text style={styles.loginTxt}>Add Enquiry</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
