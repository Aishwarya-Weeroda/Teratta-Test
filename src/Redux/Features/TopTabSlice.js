import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tabs: ['test1', 'test2', 'tes34', 'test4'],
  activeTab: 'test1',
};

export const topTabSlice = createSlice({
  name: 'topTab',
  initialState,
  reducers: {
    updateTab: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {updateTab} = topTabSlice.actions;

export default topTabSlice.reducer;
