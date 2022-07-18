import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseStyle, useTheme} from '../../config';
import Text from '../../component/Text';
import filter from 'lodash/filter';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import Voice from '@react-native-community/voice';
import styles from './style';
import EnquiryForm from '../EnquiryForm';
import AgentSelect from '../Receipient';
import {getAgents} from '../../Redux/Features/AgentsSlice';
import {addEnquiries} from '../../Redux/Features/EnquirySlice';

export default function Messages({navigation}) {
  const {colors} = useTheme();
  const attributes = useSelector(state => state.attributes.attributes);
  const agents = useSelector(state => state.agents.agents);
  const dispatch = useDispatch();
  const [enquires, setEnquires] = useState([attributes]);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentIdex, setCurrentindex] = useState();
  const [isRecording, setRecording] = useState(false);
  const [agentDatas, setAgentDatas] = useState(agents);
  useEffect(() => {
    dispatch(getAgents());
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  useEffect(() => {
    setAgentDatas(agents);
  }, [agents]);

  const onRecordStart = () => {
    setRecording(!isRecording);
  };

  const addEnquiryForm = () => {
    const newEnquiryForms = [...enquires];
    newEnquiryForms.push(attributes);
    setEnquires(newEnquiryForms);
  };
  const onDelete = index => {
    const newEnquiryForms = [...enquires];
    newEnquiryForms.splice(index, 1);
    setEnquires(newEnquiryForms);
  };

  const onChildPress = (item, parentId) => {
    const newAgentDatas = JSON.parse(JSON.stringify(agentDatas));
    newAgentDatas
      .filter(agent => agent.id === parentId)
      .map(agent => {
        agent.agents
          .filter(user => user._id === item._id)
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
    const newAgentDatas = JSON.parse(JSON.stringify(agentDatas));
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

  const onChangeText = (id, value, rootIndex, childIndex) => {
    const newData = JSON.parse(JSON.stringify(enquires));
    newData[rootIndex][childIndex].value = value;
    setEnquires(newData);
  };

  const getRecepients = () =>
    agentDatas
      .filter(agentData => agentData.selected || agentData.partialSeclection)
      .map(data =>
        data.agents
          .filter(agent => agent.selected)
          .map(agent => ({
            userId: agent.userId,
            email: agent.email,
            userName: agent.userName,
          })),
      );

  const onSubmit = () => {
    const recepients = getRecepients();
    const data = {
      name: 'My First API Enquiry Initiated',
      description: 'Enquiry description',
      attributes: enquires,
      agents: [
        {
          '6b1d6e0d-4b63-4daf-a441-d5d97cb981c8': recepients,
        },
      ],
    };
    if (recepients.length > 0) {
      dispatch(addEnquiries(data));
    }
    setModalVisible(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <AgentSelect
        isVisible={modalVisible}
        onAccPress={onAccPress}
        onChildPress={onChildPress}
        data={agentDatas}
        setModalVisible={setModalVisible}
        onSubmit={onSubmit}
      />
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
              {enquires.map((enquire, index) => (
                <EnquiryForm
                  key={index}
                  fields={enquire}
                  canDelete={enquires.length > 1}
                  index={index}
                  onDelete={() => onDelete(index)}
                  onFocus={setCurrentindex}
                  onChangeText={(id, value, childIdx) =>
                    onChangeText(id, value, index, childIdx)
                  }
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
      <View style={[styles.loginBtnContainer, styles.shdow]}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => setModalVisible(true)}>
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
