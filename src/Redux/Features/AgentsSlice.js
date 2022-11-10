import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {http, thunkHandler} from '../Api/Api';
import {groupAgents} from '../../utils/';

const initialState = {
  agents: [],
  suppliers: [],
  agentsData: [],
  buyers: [],
};
const defaultParams = {
  page: 1,
  limit: 100,
  type: 'AGENT',
};

const defaultParams1 = {
  page: 1,
  limit: 100,
  type: 'SUPPLIER',
};

export const getAgents = createAsyncThunk(
  'agents/get',
  (params = defaultParams, thunkAPI) =>
    thunkHandler(http.get('/enquiries/users', {params}), thunkAPI),
);

export const getBuyers = createAsyncThunk(
  'buyers/get',
  (params = defaultParams, thunkAPI) =>
    thunkHandler(http.get('/enquiries/users', {params}), thunkAPI),
);
export const getSupplier = createAsyncThunk(
  'supplier/get',
  (params = defaultParams1, thunkAPI) =>
    thunkHandler(http.get('/enquiries/users', {params}), thunkAPI),
);

export const getSuppliersByOrg = createAsyncThunk(
  'supplier/get',
  (params = defaultParams1, thunkAPI) =>
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

    [getSupplier.fulfilled]: (state, {payload}) => {
      state.suppliers = payload;
    },

    [getBuyers.fulfilled]: (state, {payload}) => {
      state.buyers = payload;
    },
  },
});

export default agentsSlice.reducer;
