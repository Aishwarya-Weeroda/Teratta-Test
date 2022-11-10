import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import {updateAppState} from '../../Redux/Features/AppSlice';

export function CustomeToast(props) {
  const app = useSelector(state => state.app);
  const dispatch = useDispatch();
  const show = () => {
    Toast.show({
      type: app.type,
      text1: app.title,
      text2: app.message,
      position: 'bottom',
      onHide: () => dispatch(updateAppState({showToast: false})),
    });
  };

  useEffect(() => {
    if (app.showToast) {
      show();
    }
  }, [app]);
  return (
    <>
      <Toast />
    </>
  );
}
