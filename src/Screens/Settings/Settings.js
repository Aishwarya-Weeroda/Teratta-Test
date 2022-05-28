import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  FlatList,
  StatusBar,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

import {ThemeSupport, BaseStyle, useTheme} from '../../config';
import Header from '../../component/Header/Header';
import styles from './SettingsStyle';
import {changeTheme} from '../../Redux/Features/ApplicationSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function ThemeSetting({navigation}) {
  const themeStorage = useSelector(state => state.application.theme);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const [themeSupport, setTheme] = useState(ThemeSupport);

  useEffect(() => {
    setTheme(
      ThemeSupport.map(item => {
        return {
          ...item,
          selected: item.theme == themeStorage,
        };
      }),
    );
  }, [themeStorage]);

  /**
   * call when select theme
   *
   * @param {*} selected
   */
  const onSelect = selected => {
    setTheme(
      themeSupport.map(item => {
        return {
          ...item,
          selected: item.theme == selected.theme,
        };
      }),
    );
  };

  /**
   * call when save theme
   *
   */
  const onChangeTheme = () => {
    const list = themeSupport.filter(item => item.selected);
    if (list.length > 0) {
      dispatch(changeTheme(list[0].theme));
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(list[0].light.colors.primary, true);
      }
    }
  };

  /**
   * render UI theme item
   *
   * @param {*} item
   * @returns
   */
  const renderItem = item => {
    return (
      <TouchableOpacity
        style={[
          styles.profileItem,
          {borderBottomColor: colors.border, borderBottomWidth: 1},
        ]}
        onPress={() => onSelect(item)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: item.light.colors.primary,
            }}
          />
          <Text style={{marginHorizontal: 8}}>{item.theme}</Text>
        </View>
        {item.selected && (
          <Icon name="checkmark-sharp" size={18} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        title="theme"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-back-outline"
              size={20}
              color={colors.primary}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <FlatList
          contentContainerStyle={styles.contain}
          data={themeSupport}
          keyExtractor={(item, index) => item.theme}
          renderItem={({item}) => renderItem(item)}
        />
        <View style={{flex: 1}}>
          <View style={styles.loginBtnContainer}>
            <TouchableOpacity onPress={onChangeTheme}>
              <LinearGradient
                style={styles.loginBtn}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.primary, colors.secondary]}>
                <Text style={styles.loginTxt}>Apply</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
