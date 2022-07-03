import api from './Api';

export const getAttributesApi = () =>
  api.get('/attributes').then(resp => resp.data);
