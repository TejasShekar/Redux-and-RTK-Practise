import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchUsers} from "./userSlice";

export const UserView = () => {
  const {isLoading, data, error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h2>List of Users</h2>
      <ul>
        {isLoading && <p>L O A D I N G . . . .</p>}
        {!isLoading && error !== "" && <p>Error : {error}</p>}
        {!isLoading &&
          data.length > 0 &&
          data.map((user) => (
            <li key={user.id} style={{listStyleType: "none"}}>
              {user.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
