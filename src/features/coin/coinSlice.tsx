import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { coinGeckoClient as httpClient } from '../../client/httpClient';

const initialState = {
  data: [['', '', '', '', '']],
  loading: false,
};

export const fetchCoinChartData = createAsyncThunk('table/fetchCoinChartData', async (id: string = 'bitcoin') => {
  const response = await httpClient.get(`/coins/${id}/ohlc?vs_currency=usd&days=1`);
  return response.data;
});

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinChartData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCoinChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCoinChartData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setTableData } = coinSlice.actions;

export default coinSlice.reducer;
