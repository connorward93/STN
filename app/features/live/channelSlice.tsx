import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const channelSlice = createSlice({
  name: 'channels',
  initialState: { live: [], playing: false, currentChannel: '' },
  reducers: {
    updateChannels: (state, action) => {
      state.live = action.payload;
    },
    updatePlaying: (state, action) => {
      state.currentChannel = action.payload;
    },
    play: (state) => {
      state.playing = true;
    },
    pause: (state) => {
      state.playing = false;
    },
  },
});

export const {
  updateChannels,
  updatePlaying,
  play,
  pause,
} = channelSlice.actions;

export default channelSlice.reducer;

export const channels = (state: RootState) => state.channels.live;
export const playing = (state: RootState) => state.channels.playing;
export const currentlyPlaying = (state: RootState) =>
  state.channels.currentChannel;
