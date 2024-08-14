import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      console.log("action.payload====>>>>", action.payload);

      if (existingIndex >= 0) {
        const item = state.items[existingIndex];
        const totalRequestedQuantity = item.cartQuantity + 1;

        if (totalRequestedQuantity > action.payload.quantity) {
          alert("The requested quantity is not available.");
        } else {
          state.items[existingIndex] = {
            ...item,
            cartQuantity: totalRequestedQuantity,
          };
          state.totalAmount += item.price;
          state.totalQuantity += 1;
        }
      } else {
        if (1 > action.payload.quantity) {
          alert("The requested quantity is not available.");
        } else {
          let tempProductItem = { ...action.payload, cartQuantity: 1 };
          state.items.push(tempProductItem);
          state.totalAmount += action.payload.price;
          state.totalQuantity += 1;
        }
      }
    },

    increaseQuantity: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        const item = state.items[existingIndex];
        const totalRequestedQuantity = item.cartQuantity + 1;

        console.log("totalRequestedQuantity ", totalRequestedQuantity);
        console.log("payloadQuantity ", action.payload.quantity);
        console.log("payloadQuantity ", action.payload);
        if (totalRequestedQuantity > action.payload.quantity) {
          alert("The requested quantity is not available.");
        } else {
          state.items[existingIndex] = {
            ...item,
            cartQuantity: totalRequestedQuantity,
          };
          state.totalAmount += item.price;
          state.totalQuantity += 1;
        }
      }
    },

    removeFromCart: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.totalAmount -=
          state.items[existingIndex].price *
          state.items[existingIndex].cartQuantity;
        state.totalQuantity -= state.items[existingIndex].cartQuantity;
        state.items.splice(existingIndex, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;


