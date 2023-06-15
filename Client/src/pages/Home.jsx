import React, { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

import {
  useNavigate,
  Navigate,
  Link as RouterLink,
  BrowserRouter,
} from "react-router-dom";
export default function HomePage() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  if (!currentUser) return <Navigate to="/landingpage" />;

  return <>
    <h1>Home</h1>
    <p>Put something interesting here! NOOOO</p>
  </>;
}
