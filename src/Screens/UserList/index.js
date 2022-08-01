import React from 'react';
import {View, FlatList} from 'react-native';
import {useTheme} from '../../config';
import styles from './style';
import Text from '../../component/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListThumbSquare from '../../component/ListThumbSquare';

export default function UserList({navigation, data}) {
  const {colors} = useTheme();

  /**
   * render Content list
   */
  const RenderContent = () => {
    if (data.length > 0) {
      return (
        <FlatList
          data={data}
          keyExtractor={(item, index) => `messenger ${index}`}
          renderItem={({item, index}) => (
            <ListThumbSquare
              onPress={() => {
                navigation.navigate('UserDetails', {user: item});
              }}
              image={require('../../images/avatar1.png')}
              txtLeftTitle={`${item.firstName} ${item.lastName}`}
              txtContent={item.email}
            />
          )}
        />
      );
    }
    if (data.length == 0) {
      return (
        <View style={styles.loadingContent}>
          <View style={{alignItems: 'center'}}>
            <Icon
              name="frown-open"
              size={18}
              color={colors.text}
              style={{marginBottom: 4}}
            />
            <Text>Data Not FOund</Text>
          </View>
        </View>
      );
    }

    return (
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        keyExtractor={(item, index) => `Messages${index}`}
        renderItem={({item, index}) => <ListThumbSquare loading={true} />}
      />
    );
  };

  return <RenderContent />;
}
