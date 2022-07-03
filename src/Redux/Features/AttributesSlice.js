import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getAttributesApi} from '../Api/AttributesApi';

const initialState = {
  attributes: [],
};
export const getAttributes = createAsyncThunk(
  'attributes/get',
  async thunkAPI => getAttributesApi(),
);

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
