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
import {getAgentsByOrg} from '../../Redux/Features/AgentsSlice';
import {addEnquiries, getEnquiries} from '../../Redux/Features/EnquirySlice';
import {each} from 'immer/dist/internal';

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
  const [err, setErr] = useState(false);
  const [showErr, setShowerr] = useState(false);
  useEffect(() => {
    dispatch(getAgentsByOrg());
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [dispatch]);
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
      .filter(agent => agent.orgId === parentId)
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
      .filter(agent => agent.orgId === item.orgId)
      .map(agent => {
        if (item.selected) {
          agent.selected = false;
          agent.partialSeclection = false;
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
    setShowerr(false);
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
            orgId: data.orgId,
          })),
      )
      .map(obj => ({[obj[0].orgId]: obj}));

  const onSubmit = () => {
    const recepients = getRecepients();
    const data = {
      name: Date(),
      description: 'Enquiry description',
      attributes: enquires,
      agents: recepients,
    };
    if (recepients.length > 0) {
      dispatch(addEnquiries(data))
        .unwrap()
        .then(() => {
          dispatch(getEnquiries());
          navigation.navigate('HomeStack');
        });
    }
  };

  const validation = () => {
    // for (let i = 0; i < enquires.length;) {
    //   for (let a = 0; a < enquires[0][i].value.length; a==0) {
    //     console.log(enquires[i][a]);
    //   }
    // }

    enquires.forEach(function (value) {
      value.forEach(function (col) {
        console.log(col.value);
        if (col.value.length == 0) {
          setErr(true);
          setShowerr(true);
        } else if (col.value.length != 0) {
          setErr(false);
          setShowerr(false);
          setModalVisible(true);
        }
      });
    });
    // if (err) {
    //   setShowerr(true);
    // }
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
        type="agents"
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
        keyboardVerticalOffset={-200}>
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
        {showErr && <Text style={{color: 'red'}}> Please enter all</Text>}
        <TouchableOpacity style={{padding: 5}} onPress={validation}>
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
