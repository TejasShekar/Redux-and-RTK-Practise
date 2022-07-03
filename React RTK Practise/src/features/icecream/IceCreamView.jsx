import {useSelector} from "react-redux";

export const IceCreamView = () => {
  const noOfIceCreams = useSelector((state) => state.iceCream.noOfIcecreams);
  return (
    <div>
      <h2>Number of Ice Creams - {noOfIceCreams}</h2>
      <button>Order Ice Cream</button>
      <button>Restock Ice Cream</button>
    </div>
  );
};
