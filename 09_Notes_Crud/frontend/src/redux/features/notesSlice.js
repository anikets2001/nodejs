import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
   activeNote: null,
  },
  reducers: {
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
    },
  },
})

export const { setActiveNote } = notesSlice.actions
export default notesSlice.reducer