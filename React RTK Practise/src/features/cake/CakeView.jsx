import {useSelector} from "react-redux";

export const CakeView = () => {
  const noOfCakes = useSelector((state) => state.cake.noOfCakes);
  return (
    <div>
      <h2>Number of Cakes - {noOfCakes}</h2>
      <button>Order Cake</button>
      <button>Restock Cake</button>
    </div>
  );
};
