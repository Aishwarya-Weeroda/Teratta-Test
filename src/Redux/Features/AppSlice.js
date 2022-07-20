import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  message: '',
  title: '',
  code: '',
  showToast: false,
  type: '',
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
      state.loading = false;
      state.message = payload.statusDesc;
      state.title = payload.statusTitle;
      state.code = payload.statusCode;
      state.showToast = true;
      state.type = 'error';
    });
    builder.addMatcher(isFulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export default appSlice.reducer;
