import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "users",
  initialState: {
    user: "guest",
    userId: "",
    token: "",
    kycStatus: ""
  },
  reducers: {
    logout: (state, action) => {
      state.user = "guest";
      state.userId = "";
      state.token = ''
      state.kycStatus = ''
    },
    login: (state, action) => {
      console.log(action)
      state.user = action.payload?.name;
      state.userId = action.payload?._id;
      state.token = action.payload?.token;
      state.kycStatus = action.payload?.kyc?.status;
    },

  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
