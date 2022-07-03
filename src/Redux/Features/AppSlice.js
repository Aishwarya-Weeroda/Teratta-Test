import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
};

const appSlice = createSlice({
  name: 'app',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder.addMatcher(isPending, (state, action) => {
      state.loading = true;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false;
    });
    builder.addMatcher(isFulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export default appSlice.reducer;
