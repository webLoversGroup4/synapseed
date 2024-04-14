import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Logo from './Logo';

const maroonTheme = createTheme({
  palette: {
    primary: {
      main: '#800000',
      contrastText: '#ffffff', 
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Research Education Collaborative
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <ThemeProvider theme={maroonTheme}>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          backgroundColor: maroonTheme.palette.primary.main,
          color: maroonTheme.palette.primary.contrastText,
          mt: 'auto', 
          width: '100%', 
        }}
      >
        <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
