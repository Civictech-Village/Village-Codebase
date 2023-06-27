import { useContext, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import NotFoundPage from "./pages/NotFound";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Organizations from "./pages/Organizations";
import OrgLayoutPage from "./pages/OrgLayout";
import LandingPage from "./pages/LandingPage";
<<<<<<< HEAD
=======
import SingleOrg from "./pages/SingleOrg";
import SideBar from "./components/SideBar";
import StickyBox from "react-sticky-box";
import Settings from "./pages/Settings";
import CurrentUserContext from "./contexts/current-user-context";
import Footer from "./components/LandingPage/Footer";
import Feed from "./pages/Feed";
import Map from "./pages/Map";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Messages from "./pages/Messages";
>>>>>>> main
export default function App() {
  const { currentUser, setCurrentUser, setLoggedIn } =
    useContext(CurrentUserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
    setLoggedIn(true)
  }, [setCurrentUser]);


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <main>
          <Routes>
            <Route
              path="/Feed"
              element={
                <>
                  <SideBar />
                  <Home />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <LoginPage />
                </>
              }
            />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route
              path="/organizations"
              element={
                <>
                  <SideBar />
                  <Organizations />
                </>
              }
            />
            <Route
              path="/organizations/:id"
              element={
                <>
                  <SideBar />
                  <SingleOrg></SingleOrg>
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <SignUpPage />
                </>
              }
            />
            <Route
              path="/users"
              element={
                <>
                  <SideBar />
                  <UsersPage />
                </>
              }
            />
            <Route
              path="/users/:id"
              element={
                <>
                  <SideBar />
                  <UserPage />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <SideBar />
                  <Settings />
                </>
              }
            />
            <Route
              path="/Map"
              element={
                <>
                  <SideBar />
                  <Map />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <SideBar />
                  <Feed />
                </>
              }
            />
            <Route
              path="/Messages"
              element={
                <>
                  <SideBar />
                  <Messages />
                </>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </LocalizationProvider>
    </>
  );
}
