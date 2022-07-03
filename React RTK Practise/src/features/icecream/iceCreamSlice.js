import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  noOfIcecreams: 20,
};

const iceCreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.noOfIcecreams -= action.payload;
    },
    restocked: (state, action) => {
      state.noOfIcecreams += action.payload;
    },
  },
});

export default iceCreamSlice.reducer;
export const {ordered, restocked} = iceCreamSlice.actions;
