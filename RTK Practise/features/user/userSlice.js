const createSlice = require("@reduxjs/toolkit").createSlice;

const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
const axios = require("axios");

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

// Pending, fulfilled, rejected action-types are created by createAsyncThunk
const fetchUsers = createAsyncThunk("user/fetchUser", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data.map((user) => user.id));
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

// export reducer and async fn
module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
