import axios from 'axios';
import {store} from '../Store/Store';
import {logout} from '../Features/LoginSlice';

function select(state) {
  return state.login.token;
}

export const http = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 10,
});

http.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    if (
      config.headers.common['Authorization'] ||
      config.headers['Authorization']
    ) {
      return config;
    }
    const state = store.getState();
    const token = select(state);
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    console.log('token  error', error);
    Promise.reject(error);
  },
);

export const thunkHandler = async (asyncFn, thunkAPI) => {
  try {
    const response = await asyncFn;
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(error.response.data);
    } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
        return thunkAPI.rejectWithValue({
          statusCode: '500',
          statusTitle: 'Timeout',
          statusDesc: error.message,
        });
      }
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
