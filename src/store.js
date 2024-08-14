import { configureStore } from '@reduxjs/toolkit';
import catalogueReducer from './features/catalogue/catalogueSlice';
import cartReducer from './features/cartSlice/cartSlice'

const store = configureStore({
  reducer: {
    catalogue: catalogueReducer,
    cart: cartReducer,
  },
});

export default store;