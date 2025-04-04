import { configureStore } from '@reduxjs/toolkit';
import { languageReducer, themeReducer } from '@/store';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
