import api from './Api';

export const authApi = payload =>
  api.post('/auth', payload).then(resp => resp.data);
