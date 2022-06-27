const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
// adding middleware
const applyMiddleware = redux.applyMiddleware;
const createLogger = require("redux-logger").createLogger;
const logger = createLogger();

// define action types as constants. This prevents spelling mistakes. A practise followed in code bases
const ORDER_CAKE = "ORDER_CAKE";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const ORDER_ICECREAM = "ORDER_ICECREAM";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";

//Instead of passing actions object directly, we are creating action creators that can be used to pass dynamic actions that carry different payload. This is good practise as it avoids code repetetion.
const orderCake = (quantity = 1) => {
  return {
    type: ORDER_CAKE,
    payload: quantity,
  };
};

const restockCake = (quantity = 1) => {
  return {
    type: RESTOCK_CAKE,
    payload: quantity,
  };
};

const orderIceCream = (quantity = 1) => {
  return {
    type: ORDER_ICECREAM,
    payload: quantity,
  };
};

const restockIceCream = (quantity = 1) => {
  return {
    type: RESTOCK_ICECREAM,
    payload: quantity,
  };
};

// create initial state(s)

const initialCakeState = {
  noOfCake: 10,
};

const initialIceCreamState = {
  noOfIceCreams: 10,
};

//create reducers that handle those states
// Important thing to follow is that EACH STATE AND REDUCER SHOULD ONLY HANDLE ONE TASK AND NOTHING ELSE. Yes, you can combine them all under one state and do it, but as the initial state and the reducers that handle the state grows overtime, it gets harder to debug and also the reducer function also gets quite big to debug as well.
// Keeping things in small blocks of code helps in writing a good code.

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case ORDER_CAKE:
      return {
        ...state,
        noOfCake: state.noOfCake - action.payload,
      };
    case RESTOCK_CAKE:
      return {
        ...state,
        noOfCake: state.noOfCake + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ORDER_ICECREAM:
      return {
        ...state,
        noOfIceCreams: state.noOfIceCreams - action.payload,
      };
    case RESTOCK_ICECREAM:
      return {
        ...state,
        noOfIceCreams: state.noOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

//Step 1: create a store for the apply by combining all required reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
// Step 1: create a store
const store = createStore(rootReducer, applyMiddleware(logger));

//Step 2: check for initial state (optional)
console.log("Initial State", store.getState());

//Step 3: Subscribe the listeners to keep track of changes in the store/state
// const unsubscribe = store.subscribe(() =>
//   console.log("State is Updated :", store.getState())
// );
const unsubscribe = store.subscribe(() => {});

//Step 4: dispatch the actions that the reducer has to execute
store.dispatch(orderCake(2));
store.dispatch(orderCake(4));
store.dispatch(orderIceCream(2));
store.dispatch(restockCake(6));
store.dispatch(orderIceCream(5));
store.dispatch(restockIceCream(7));

//unsubscribe so that you no longer listen to the changes in the store
unsubscribe();
