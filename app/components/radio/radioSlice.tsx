import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const radioSlice = createSlice({
  name: 'radio',
  initialState: { live: [], currentChannel: '' },
  reducers: {
    updateChannels: (state, action) => {
      state.live = action.payload;
    },
    updatePlaying: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export const { updateChannels, updatePlaying } = radioSlice.actions;

export default radioSlice.reducer;

export const channels = (state: RootState) => state.radio.live;
export const currentlyPlaying = (state: RootState) =>
  state.radio.currentChannel;
