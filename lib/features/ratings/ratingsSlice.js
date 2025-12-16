import { createSlice } from "@reduxjs/toolkit";

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: [],
  reducers: {
    addRating: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
