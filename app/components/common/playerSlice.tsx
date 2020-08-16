import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playing: false,
    current: undefined,
    source: '',
    details: { title: '', subtitle: '', picture: '' },
  },
  reducers: {
    play: (state) => {
      state.playing = true;
    },
    pause: (state) => {
      state.playing = false;
    },
    updatePlayer: (state, action) => {
      state.current = action.payload;
    },
    updateSource: (state, action) => {
      state.source = action.payload;
    },
    updateDetails: (state, action) => {
      state.details.title = action.payload.title;
      state.details.subtitle = action.payload.subtitle;
      state.details.picture = action.payload.picture;
    },
  },
});

export const {
  play,
  pause,
  updatePlayer,
  updateSource,
  updateDetails,
} = playerSlice.actions;

export default playerSlice.reducer;

export const playing = (state: RootState) => state.player.playing;
export const currentPlayer = (state: RootState) => state.player.current;
export const currentSource = (state: RootState) => state.player.source;
export const currentDetails = (state: RootState) => state.player.details;
