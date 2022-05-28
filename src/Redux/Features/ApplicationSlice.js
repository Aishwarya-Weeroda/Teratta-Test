import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  theme: null,
  font: null,
  force_dark: null,
  language: null,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    forceTheme: (state, action) => {
      state.force_dark = action.payload;
    },
  },
});

export const {changeTheme, forceTheme} = applicationSlice.actions;

export default applicationSlice.reducer;
