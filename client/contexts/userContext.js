import React from "react";

import { userReducer } from "../stores/userReducer";

export const UserContext = React.createContext(null);

export const UserProvider = props => {
  const [user, dispatch] = userReducer();

  return (
    <UserContext.Provider
      value={{
        user,
        dispatch
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
