// create an app that fetches users from API and displays it
const redux = require("redux");
const createStore = require("redux").createStore;
const applyMiddleware = redux.applyMiddleware;

// import axios for api calls and redux-thunk for handling async calls
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;

// initial state
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// actions
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// action creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const fetchUsersFailed = (errMsg) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: errMsg,
  };
};

// reducer
const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        users: [],
        error: payload,
      };
    default:
      return state;
  }
};

// create store and add redux thunk as middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// subscribe
store.subscribe(() => {
  console.log(store.getState());
});

// create a async action and dispatcher function
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const userData = res.data.map((user) => user.name);
        dispatch(fetchUsersSuccess(userData));
      })
      .catch((err) => {
        dispatch(fetchUsersFailed(err.message));
      });
  };
};

// In the above fn, a fn with dispatch as its arg is being returned bcz store.dispatch() fn provides the dispatch fn. Hence you are using it to perform several async actions within a function body.

// Its similar to the below fn, but we are extracting out that logic and returning it via another function. This keeps code clean, modular and that same dispatching actions can be used in other places if necessary, thereby encouraging DRY principle of coding.

// store.dispatch((dispatch) => {
//   dispatch(fetchUsersRequest());
//   axios
//     .get("https://jsonplaceholder.typicode.com/users")
//     .then((res) => {
//       const userData = res.data;
//       dispatch(fetchUsersSuccess(userData));
//     })
//     .catch((err) => {
//       dispatch(fetchUsersFailed(err.message));
//     });
// });

// dispatch the async action
store.dispatch(fetchUsers());
