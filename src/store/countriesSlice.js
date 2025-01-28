import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  selectedRegion: "All",
  visible: 8,
  currentIndex: 0,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
    loadMore: (state) => {
      state.visible += 8;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { setCountries, setRegion, loadMore, setCurrentIndex } = countriesSlice.actions;

export default countriesSlice.reducer;
