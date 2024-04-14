import React from 'react';
import Box from '@mui/material/Box';

const Logo = () => (
  <Box sx={{ p: 2 }}> 
    <img
      src='../public/logo.png' 
      alt="Logo"
      style={{ width: '100px', height: 'auto' }} 
    />
  </Box>
);

export default Logo;

