import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkTheme: localStorage.getItem('isDarkTheme') === 'true',
  isPageLoaded: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      localStorage.setItem('isDarkTheme', state.isDarkTheme.toString());
      state.isPageLoaded = true;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
