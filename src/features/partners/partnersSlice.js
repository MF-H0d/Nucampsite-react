// import { PARTNERS } from "../../app/shared/oldData/PARTNERS";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";
import { mapImageURL } from "../../utils/mapImageURL";

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async () => {
    const response = await fetch(baseUrl + "partners");
    if (!response.ok) {
      return Promise.reject(`Failed to fetch, status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  partnersArray: [],
  isLoading: true,
  errMsg: "",
};

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPartners.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPartners.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.partnersArray = mapImageURL(action.payload);
    },
    [fetchPartners.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const partnersReducer = partnersSlice.reducer;

export const selectAllPartners = (state) => state.partnersArray;

export const selectFeaturedPartner = (state) =>
  state.partners.partnersArray.find((p) => p.featured);

//TODO:
// import { createAsyncThunk } from "@reduxjs/toolkit";
// call createAsyncThunk
// update initial state to hold values for pending, fulfilled, and rejected states of partners data
// update createSlice() call to add extra Reducers to handle those three states
