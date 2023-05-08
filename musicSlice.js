import { createSlice } from '@reduxjs/toolkit';

export const musicSlice = createSlice({
  name: 'music',
  initialState: {
    musics : []
  },
  reducers: {
    addItemToMusic: (state, action) => {
      state.musics = [...state.musics, {id: action.payload.id, name: action.payload.name, author: action.payload.author, uri: action.payload.uri}]
    },
    removeItemFromMusic: (state, action) => {
      state.musics = state.musics.filter(item => item.id !== action.payload.id)
    },
  },
});

export const { addItemToMusic, removeItemFromMusic } = musicSlice.actions;

export const selectItems = (state) => state.music.musics;

export default musicSlice.reducer;