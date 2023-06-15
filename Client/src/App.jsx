import { useContext, useEffect } from 'react';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Organizations from './pages/Organizations'
import OrgLayoutPage from './pages/OrgLayout'
import LandingPage from './pages/LandingPage'
import OrganizationPosts from './components/OrganizationPosts';
export default function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path ='/LandingPage' element={<LandingPage/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/organizations' element={<Organizations />} />
        <Route path='/organizations/:id' element={<OrgLayoutPage/>} />
        <Route path='./components/OrganizationPosts' element={<OrganizationPosts/>} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
    </LocalizationProvider>
  </>;
}
