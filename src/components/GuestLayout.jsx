import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StickyFooter from './Footer';
import GuestHeader from './GuestHeader';
import scrollToSection from './scrollToSection';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserState } from '../contexts/ContextProvider'; 

const GuestLayout = () => {
  const { userToken } = useUserState(); 

  if (userToken) {
    return <Navigate to="/details" />;
  }

  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const savedMode = localStorage.getItem('themeMode') || 'light';

  useEffect(() => {
    setMode(savedMode);
  }, [savedMode]);

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#800000',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
        <Grid container direction="column">
          {/* GuestHeader Component */}
          <Grid item>
            <GuestHeader
              scrollToSection={scrollToSection}
              handleSignIn={handleSignIn}
              handleSignUp={handleSignUp}
              mode={mode}
              toggleTheme={toggleTheme}
            />
          </Grid>

          {/* Main Content (Outlet) */}
          <Grid item sx={{ flexGrow: 1 }}>
            <Outlet />
          </Grid>

          {/* StickyFooter Component */}
          <Grid item>
            <StickyFooter />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

GuestLayout.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default GuestLayout;
