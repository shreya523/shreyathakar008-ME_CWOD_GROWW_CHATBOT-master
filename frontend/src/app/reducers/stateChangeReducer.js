import { createSlice } from "@reduxjs/toolkit";

export const stateChangeReducer = createSlice({
  name: "chatbot",
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => {
      state.value = true;
    },
    close: (state) => {
      state.value = false;
    },
    // changeState : state => {
    //   state.value = !state.value
    // }
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = stateChangeReducer.actions;

export default stateChangeReducer.reducer;
