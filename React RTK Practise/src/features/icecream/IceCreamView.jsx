import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {ordered, restocked} from "./iceCreamSlice";

export const IceCreamView = () => {
  const [count, setCount] = useState(0);

  const noOfIceCreams = useSelector((state) => state.iceCream.noOfIcecreams);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of Ice Creams - {noOfIceCreams}</h2>
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
        Order Ice Cream
      </button>
      <button
        onClick={() => {
          dispatch(restocked(count));
          setCount(0);
        }}
      >
        Restock Ice Cream
      </button>
    </div>
  );
};
