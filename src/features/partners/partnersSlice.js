import { PARTNERS } from "../../app/shared/PARTNERS";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partnersArray: PARTNERS,
};

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
});

export const partnersReducer = partnersSlice.reducer;

export const selectAllPartners = (state) => state.partnersArray;

export const selectFeaturedPartner = (state) =>
  state.partners.partnersArray.find((p) => p.featured);
