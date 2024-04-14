import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'; 
import MenuItem from '@mui/material/MenuItem';
import ToggleColorMode from './ToggleColorMode';
import Logo from './Logo';
import { Box } from '@mui/material'; 

const GuestHeader = ({ scrollToSection, handleSignIn, handleSignUp, mode, toggleTheme }) => {
  return (
    <AppBar position="fixed" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Logo />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Research Education Collaborative
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MenuItem onClick={() => scrollToSection('about')}>About</MenuItem>
            <MenuItem onClick={() => scrollToSection('services')}>Services</MenuItem>
            <MenuItem onClick={() => scrollToSection('contact')}>Contact</MenuItem>
            <Button color="inherit" variant="outlined" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button color="inherit" variant="outlined" onClick={handleSignUp}>
              Sign Up
            </Button>
            <ToggleColorMode mode={mode} toggleColorMode={toggleTheme} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default GuestHeader;
