import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const url = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
// Async thunk to fetch the catalogue data
export const fetchCatalogue = createAsyncThunk('catalogue/fetchCatalogue', async () => {
  const response = await axios.get(url);
  return response.data;
});

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatalogue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(item => ({
          ...item,
          cartQuantity: 0, // Initialize cartQuantity with 0
        }));
      })
      .addCase(fetchCatalogue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default catalogueSlice.reducer;

