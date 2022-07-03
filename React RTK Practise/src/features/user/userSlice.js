import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

// Pending, fulfilled, rejected action-types are created by createAsyncThunk
export const fetchUsers = createAsyncThunk("user/fetchUser", () => {
  return axios.get("https://jsonplaceholder.typicode.com/users").then((res) => res.data);
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
export default userSlice.reducer;
