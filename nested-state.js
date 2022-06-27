// Trying out immer.js and seeing if it eases the job.
const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;

const user = {
  name: "John",
  lastName: "Doe",
  country: "USA",
  address: {
    street: "123 ABC",
    city: "Boston",
    state: "MA",
  },
};

const UPDATE_STREET = "UPDATE_STREET";

const updateStreet = (street) => {
  return {
    type: UPDATE_STREET,
    payload: street,
  };
};

const reducer = (state = user, action) => {
  switch (action.type) {
    case UPDATE_STREET:
      //  Immutable state update

      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };

      //  state update using immer
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("State is Updated :", store.getState())
);
// const unsubscribe = store.subscribe(() => {});

store.dispatch(updateStreet("456 ABC"));

unsubscribe();
