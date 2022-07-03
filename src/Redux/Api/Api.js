import axios from 'axios';
import {store} from '../Store/Store';

store.subscribe(listener);

function select(state) {
  return state.login.token;
}

function listener() {
  let token = select(store.getState());
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
