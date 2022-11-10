import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {http, thunkHandler} from '../Api/Api';

const initialState = {
  attributes: [],
};

export const getAttributes = createAsyncThunk('attributes/get', thunkAPI => {
  return thunkHandler(http.get('/attributes'), thunkAPI);
});

export const attributesSlice = createSlice({
  name: 'attributes',
  initialState,
  reducers: {},
  extraReducers: {
    [getAttributes.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.attributes = payload.map(attribute => ({
        attributeId: attribute.attributeId,
        name: attribute.name,
        value: '',
      }));
    },
  },
});

export default attributesSlice.reducer;
