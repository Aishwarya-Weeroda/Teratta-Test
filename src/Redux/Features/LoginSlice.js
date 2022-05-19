import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userName: '',
  password: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
      };
    },
    logout: () => {
      initialState;
    },
  },
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;
