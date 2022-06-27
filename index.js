const redux = require("redux");
const createStore = redux.createStore;

// define action types as constants. This prevents spelling mistakes. A practise followed in code bases
const ORDER_CAKE = "ORDER_CAKE";
const RESTOCK_CAKE = "RESTOCK_CAKE";

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

// create initial state(s)

const initialState = {
  noOfCake: 10,
};

//create reducers that handle those states

const reducer = (state = initialState, action) => {
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

// Step 1: create a store
const store = createStore(reducer);

//Step 2: check for initial state (optional)
console.log("Initial State", store.getState());

//Step 3: Subscribe the listeners to keep track of changes in the store/state
const unsubscribe = store.subscribe(() =>
  console.log("State is Updated :", store.getState())
);

//Step 4: dispatch the actions that the reducer has to execute
store.dispatch(orderCake(2));
store.dispatch(orderCake(4));
store.dispatch(restockCake(6));

//unsubscribe so that you no longer listen to the changes in the store
unsubscribe();
