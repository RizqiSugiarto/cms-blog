import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import blogDraftReducer from './blogDraftSlice'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    bloDraft: blogDraftReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
