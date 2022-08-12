import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {http, thunkHandler} from '../Api/Api';
import {groupAgents} from '../../utils/';

const initialState = {
  agents: [],
  suppliers: [],
  agentsData: [],
};
const defaultParams = {
  page: 1,
  limit: 100,
  type: 'AGENT',
};

export const getAgents = createAsyncThunk(
  'agents/get',
  (params = defaultParams, thunkAPI) =>
    thunkHandler(http.get('/enquiries/users', {params}), thunkAPI),
);

export const getSuppliersByOrg = createAsyncThunk(
  'supplier/get',
  (params = defaultParams, thunkAPI) =>
    thunkHandler(
      http.get('/enquiries/users', {
        params: {...params, type: 'SUPPLIER', groupBy: 'orgId'},
      }),
      thunkAPI,
    ),
);

export const getAgentsByOrg = createAsyncThunk(
  'agents/byOrg/get',
  (params = defaultParams, thunkAPI) =>
    thunkHandler(
      http.get('/enquiries/users', {params: {...params, groupBy: 'orgId'}}),
      thunkAPI,
    ),
);

export const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {},
  extraReducers: {
    [getAgents.fulfilled]: (state, {payload}) => {
      state.agentsData = payload;
    },
    [getAgentsByOrg.fulfilled]: (state, {payload}) => {
      state.agents = payload;
    },
    [getSuppliersByOrg.fulfilled]: (state, {payload}) => {
      state.suppliers = payload;
    },
  },
});

export default agentsSlice.reducer;
