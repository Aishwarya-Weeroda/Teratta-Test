import {createSlice} from '@reduxjs/toolkit';
import enquiryDetails from '../../data/EnquiryDetails';
import RFQDetails from '../../data/RFQDetails';

const initialState = {
  enquiryDetails,
  sentRFQS: RFQDetails,
  receivedRFQS: RFQDetails,
};

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
});

export const {
  createSentRFQs,
  createReceivedRFQs,
  updateSentRFQs,
  updateReceivedRFQs,
} = rfqSlice.actions;

export default rfqSlice.reducer;
