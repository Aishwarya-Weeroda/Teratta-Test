import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {http, thunkHandler} from '../Api/Api';
import {groupAgents} from '../../utils/';

const initialState = {
  agents: [],
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
      state.loading = false;
      state.agentsData = payload;
    },
    [getAgentsByOrg.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.agents = payload;
    },
  },
});

export default agentsSlice.reducer;
