import React, { useState } from 'react';
import { Container, Typography, Box, Grid, TextField, Button, Link, Checkbox, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'; 
import { Navigate} from "react-router-dom";
import router from "../router";

const defaultTheme = createTheme();

const SignUp = () => {
  const [error, setError] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  try {
    const response = await fetch('http://16.16.90.16/synapseed/api/actions/signup_action.php', {
      method: 'POST',
      body: formData,
    });

    const responseData = await response.json();

    console.log('Signup response:', responseData);

    if (response.status === 201) { 
      router.navigate('/login')
    } else {
      console.error('Signup failed with status:', response.status);
      setError(responseData.error +'.  ');
    }
  } catch (error) {
    console.error('Signup failed:', error);
    setError('Signup failed:', error);
  }
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && (
            <Box mt={3} p={2} bgcolor="error.main" color="error.contrastText" borderRadius={4}>
              <Typography variant="body1">{error}</Typography>
            </Box>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  name="cpass"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#800000',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#5b0000',
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
