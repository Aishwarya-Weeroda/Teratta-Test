import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {http, thunkHandler} from '../Api/Api';

const initialState = {
  comments: {},
};

const defaultParams = {
  page: 1,
  limit: 100,
  type: 'AGENT',
};

export const getComments = createAsyncThunk(
  'comments/get',
  (params = defaultParams, thunkAPI) => {
    return thunkHandler(
      http.get('/enquiries/details/comments', {params}),
      thunkAPI,
    );
  },
);

export const postComments = createAsyncThunk(
  'comments/post',
  (payload, thunkAPI) => {
    return thunkHandler(
      http.post('/enquiries/details/comments', payload),
      thunkAPI,
    );
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [getComments.fulfilled]: (state, {payload, meta}) => {
      state.comments[meta.arg.enqDetailId] = payload;
    },
    [postComments.fulfilled]: (state, {payload, meta}) => {
      console.log('success', payload);
    },
  },
});

export default commentSlice.reducer;
