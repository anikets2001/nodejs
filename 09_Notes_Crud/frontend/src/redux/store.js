import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { notesApi } from './services/notes.js'
import notesReducer from './features/notesSlice.js'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
})

setupListeners(store.dispatch)