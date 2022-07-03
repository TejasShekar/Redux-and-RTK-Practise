import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {ordered, restocked} from "./cakeSlice";

export const CakeView = () => {
  const [count, setCount] = useState(0);

  const noOfCakes = useSelector((state) => state.cake.noOfCakes);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of Cakes - {noOfCakes}</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => {
          setCount(parseInt(e.target.value));
        }}
      />
      <button
        onClick={() => {
          dispatch(ordered(count));
          setCount(0);
        }}
      >
        Order Cake
      </button>
      <button
        onClick={() => {
          dispatch(restocked(count));
          setCount(0);
        }}
      >
        Restock Cake
      </button>
    </div>
  );
};
