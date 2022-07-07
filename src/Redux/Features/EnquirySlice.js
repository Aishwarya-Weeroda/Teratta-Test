import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {http, thunkHandler} from '../Api/Api';

const initialState = {
  enquiries: [],
  enquiryList: [],
};
const defaultParams = {
  page: 1,
  limit: 100,
};

export const addEnquiries = createAsyncThunk(
  'enquiries/add',
  (payload, thunkAPI) =>
    thunkHandler(http.post('/enquiries', payload), thunkAPI),
);

export const getEnquiries = createAsyncThunk(
  'enquiries/get',
  (params = defaultParams, thunkAPI) =>
    thunkHandler(http.get('/enquiries', {params}), thunkAPI),
);

export const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {},
  extraReducers: {
    [addEnquiries.fulfilled]: (state, {payload}) => {
      state.enquiries = payload;
    },
    [getEnquiries.fulfilled]: (state, {payload}) => {
      state.enquiryList = payload;
    },
  },
});

export default enquirySlice.reducer;
