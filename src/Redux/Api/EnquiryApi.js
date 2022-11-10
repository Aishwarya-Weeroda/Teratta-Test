import api from './Api';

export const addEnquiryApi = payload =>
  api.post('/enquiries', payload).then(resp => resp.data);

export const getEnquiriesApi = params =>
  api.get('/enquiries', {params}).then(resp => resp.data);
