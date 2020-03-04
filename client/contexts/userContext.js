import React, { useReducer, useContext } from "react";

import { UserReducer } from "../stores/userReducer";
import { initialUser } from "../stores/initialUser";

export const UserContext = React.createContext();

export const UserProvider = props => {
  const [user, dispatch] = useReducer(UserReducer, initialUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useStore = () => useContext(UserContext);
