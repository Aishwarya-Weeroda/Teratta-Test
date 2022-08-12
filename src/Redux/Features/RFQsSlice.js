import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {http, thunkHandler} from '../Api/Api';

const initialState = {
  enquiryDetails: [],
  sentRFQS: [],
  receivedRFQS: [],
};
const defaultParams = {
  page: 1,
  limit: 100,
};
export const createRFQs = createAsyncThunk('rfq/create', (payload, thunkAPI) =>
  thunkHandler(http.post('/enquiries/details/rfqs', payload), thunkAPI),
);

export const getRFQs = createAsyncThunk(
  'rfq/get',
  (params = defaultParams, thunkAPI) =>
    thunkHandler(http.get('/enquiries/details/rfqs', {params}), thunkAPI),
);

export const rfqSlice = createSlice({
  name: 'rfq',
  initialState,
  reducers: {
    updateSentRFQs: (state, action) => {
      state.sentRFQS.push(action.payload);
    },
    createSentRFQs: (state, action) => {
      state.sentRFQS.push(action.payload);
    },
    createReceivedRFQs: (state, action) => {
      state.receivedRFQS.push(action.payload);
    },
    updateReceivedRFQs: (state, action) => {
      state.receivedRFQS.push(action.payload);
    },
  },
  extraReducers: {
    [createRFQs.fulfilled]: (state, {payload}) => {
      // state.sentRFQS = payload;
    },
    [getRFQs.fulfilled]: (state, {payload}) => {
      state.sentRFQS = payload;
    },
  },
});

export const {
  createSentRFQs,
  createReceivedRFQs,
  updateSentRFQs,
  updateReceivedRFQs,
} = rfqSlice.actions;

export default rfqSlice.reducer;
