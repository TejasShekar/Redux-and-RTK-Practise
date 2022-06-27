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

// create a async action
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users1")
      .then((res) => {
        const userData = res.data;
        dispatch(fetchUsersSuccess(userData));
      })
      .catch((err) => {
        dispatch(fetchUsersFailed(err.message));
      });
  };
};

// create store and add redux thunk as middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// subscribe
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch the async action
store.dispatch(fetchUsers());
