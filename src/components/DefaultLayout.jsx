import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import StickyFooter from './Footer';
import { useUserState } from '../contexts/ContextProvider'; 

const DefaultLayout = () => {
  const { userToken } = useUserState(); 

  if (!userToken) {
    return <Navigate to="/homepage" />;
  }

  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <StickyFooter />
    </>
  );
};

export default DefaultLayout;
