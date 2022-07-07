import api from './Api';

export const getAgentsApi = params =>
  api.get('/enquiries/users', {params}).then(resp => resp.data);
