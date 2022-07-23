import axios from 'axios';
import {store} from '../Store/Store';

function select(state) {
  return state.login.token;
}

export const http = axios.create({
  baseURL: 'http://103.86.177.164/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
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
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
