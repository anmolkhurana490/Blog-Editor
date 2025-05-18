/**
 * AppContext provides global state for the application, including:
 * - currBlogId: The currently selected blog's ID.
 * - setCurrBlogId: Function to update the current blog ID.
 * - loggedIn: Boolean indicating if the user is logged in.
 * - setLoggedIn: Function to update the logged-in state.
 * - user: The current user's information.
 * - setUser: Function to update the user information.
 * */

import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currBlogId, setCurrBlogId] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);

  return (
    <AppContext.Provider value={{ currBlogId, setCurrBlogId, loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}