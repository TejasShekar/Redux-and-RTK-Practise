import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  noOfIcecreams: 20,
};

const iceCreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state, {type, payload = 1}) => {
      state.noOfIcecreams -= payload;
    },
    restocked: (state, {type, payload = 1}) => {
      state.noOfIcecreams += payload;
    },
  },
});

export default iceCreamSlice.reducer;
export const {ordered, restocked} = iceCreamSlice.actions;
