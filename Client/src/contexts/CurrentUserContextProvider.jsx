import React from "react";
import { useState } from "react";
import CurrentUserContext from "./current-user-context";


export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false)


  const context = { currentUser, setCurrentUser, loggedIn, setLoggedIn};

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
