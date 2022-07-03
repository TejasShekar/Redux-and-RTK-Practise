import {configureStore} from "@reduxjs/toolkit";
// import {createLogger} from "redux-logger";
import cakeReducer from "../features/cake/cakeSlice";
import iceCreamReducer from "../features/icecream/iceCreamSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer,
  },
  // configureStore applies a few middleware by default. So, we get all those middleware via getDefaultMiddleware and add our middlewares to it using concat().
  // commented out the middleware for adding asyncThunk as middleware.

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger),
});

export default store;
