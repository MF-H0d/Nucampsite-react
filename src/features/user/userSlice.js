import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
  },
});

export const selectCurrentUser = (state) => state.user.currentUser;
export const userReducer = userSlice.reducer;
export const { setCurrentUser } = userSlice.actions;