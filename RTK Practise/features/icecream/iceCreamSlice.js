const createSlice = require("@reduxjs/toolkit").createSlice;

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

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
