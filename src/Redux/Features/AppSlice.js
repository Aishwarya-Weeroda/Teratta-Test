import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  errorMsg: '',
  errorTitle: '',
  errorCode: '',
};

const appSlice = createSlice({
  name: 'app',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder.addMatcher(isPending, (state, action) => {
      state.loading = true;
    });
    builder.addMatcher(isRejected, (state, {payload}) => {
      console.log('action', payload);
      state.loading = false;
      state.errorMsg = payload.statusDesc;
      state.errorTitle = payload.statusTitle;
      state.errorCode = payload.statusCode;
    });
    builder.addMatcher(isFulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export default appSlice.reducer;
