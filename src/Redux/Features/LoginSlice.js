import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userName: '',
  password: '',
  name: '',
  email: '',
  role: '',
  type: '',
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
      return {
        ...initialState,
      };
    },
  },
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;
