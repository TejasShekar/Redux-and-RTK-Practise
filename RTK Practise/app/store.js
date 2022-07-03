const configureStore = require("@reduxjs/toolkit").configureStore;
const cakeReducer = require("../features/cake/cakeSlice");
const iceCreamReducer = require("../features/icecream/iceCreamSlice");
const userReducer = require("../features/user/userSlice");

// const reduxLogger = require("redux-logger").createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer,
  },
  // configureStore applies a few middleware by default. So, we get all those middleware via getDefaultMiddleware and add our middlewares to it using concat().
  // commented out the middleware for adding asyncThunk as middleware
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(reduxLogger),
});

module.exports = store;
