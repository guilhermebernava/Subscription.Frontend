// languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'br' | 'us';

export interface LanguageState {
  language: Language;
}

const initialState: LanguageState = {
  language: 'br',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
