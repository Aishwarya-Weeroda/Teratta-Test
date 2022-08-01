import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

export function CustomeToast(props) {
  const app = useSelector(state => state.app);
  const showToast = useSelector(state => state.showToast);

  const show = () => {
    Toast.show({
      type: app.type,
      text1: app.title,
      text2: app.message,
      position: 'bottom',
    });
  };

  useEffect(() => {
    if (app.showToast) {
      show();
    }
  }, [showToast]);
  return (
    <>
      <Toast />
    </>
  );
}
