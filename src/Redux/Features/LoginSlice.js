import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import {authApi} from '../Api/AuthApi';

const initialState = {
  isLoggedIn: false,
  token: '',
  userName: '',
  password: '',
  name: '',
  email: '',
  role: '',
  type: '',
};
export const authenticate = createAsyncThunk(
  'login/authenticate',
  async (payload, thunkAPI) => authApi(payload),
);

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
  extraReducers: {
    [authenticate.fulfilled]: (state, {payload}) => {
      state.token = payload.access_token;
      var decoded = jwtDecode(payload.access_token);
      state.loading = false;
      state.email = decoded.email;
      state.name = `${decoded.firstName} ${decoded.firstName}`;
      state.type = decoded?.type?.toLowerCase();
      state.isLoggedIn = true;
    },
  },
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;
