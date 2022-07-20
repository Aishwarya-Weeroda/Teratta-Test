import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

export function CustomeToast(props) {
  const app = useSelector(state => state.app);

  useEffect(() => {
    if (app.showToast) {
      Toast.show({
        type: app.type,
        text1: app.title,
        text2: app.message,
        position: 'bottom',
      });
    }
  }, [app]);
  return (
    <>
      <Toast />
    </>
  );
}
