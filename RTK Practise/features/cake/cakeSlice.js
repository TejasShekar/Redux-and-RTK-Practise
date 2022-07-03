const createSlice = require("@reduxjs/toolkit").createSlice;

// create initial state
const initialState = {
  noOfCakes: 10,
};

// create a slice for cake. This slice is part of the store that is handled by redux and managed individually.
// You only need to create slice for specific state handling and redux toolkit takes cares of actions and action creators, the reducer fn and its switch statements.
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    // notice that we are doing mutating state updates here instead of pure state updates. This is bcz RTK has immer built into it and hence immer will take care of mutating state updates on behalf of us.
    // This helps us write less and clean code.
    ordered: (state, action) => {
      state.noOfCakes -= action.payload;
    },
    restocked: (state, action) => {
      state.noOfCakes += action.payload;
    },
  },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
