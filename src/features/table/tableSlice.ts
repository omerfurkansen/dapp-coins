import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../client/httpClient';

const initialState = {
  data: [
    {
      id: '',
      market_cap_rank: 0,
      name: '',
      symbol: '',
      image: '',
      current_price: 0,
      total_volume: 0,
      market_cap: 0,
      sparkline_in_7d: { price: [] },
    },
  ],
  loading: false,
};

export const fetchTableData = createAsyncThunk('table/fetchTableData', async (pageNumber: number) => {
  const response = await httpClient.get(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNumber}&sparkline=true`
  );
  return response.data;
});

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setTableData } = tableSlice.actions;

export default tableSlice.reducer;
