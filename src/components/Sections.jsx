import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DynamicContentBox from './DynamicContentBox';

const AboutSection = ({ scrollToSection }) => {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }} id="about">
      <DynamicContentBox />
    </Box>
  );
};

const ServicesSection = ({ handleSignIn, handleSignUp }) => {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }} id="services">
      <Container maxWidth="md">
            <Typography variant="h3" gutterBottom>
              Featured Content
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Featured Research Papers
                </Typography>
                <Typography>Research Paper 1</Typography>
                <Typography>Research Paper 2</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Featured Groups
                </Typography>
                <Typography>Research Group A</Typography>
                <Typography>Research Group B</Typography>
              </Box>
            </Box>
            <Typography variant="h2" gutterBottom>
              Ready to Collaborate?
            </Typography>
            <Typography variant="body1" paragraph>
              Join our community of researchers today!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button color="primary" variant="outlined" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button color="primary" variant="contained" onClick={handleSignUp}>
                Sign Up
              </Button>
            </Box>
          </Container>
        </Box>
  );
};

const ContactSection = () => {
  return (
    <Box
      sx={{
        py: 12,
        backgroundImage: `url(../public/images/micro.jpeg)`,
        backgroundSize: 'cover',
        textAlign: 'center',
        color: '#FFFFFF',
        padding: '100px 0',
      }}
      id="contact"
    >
          <Typography variant="h2" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            Got questions or feedback? We're here to help. Reach out to us through the following channels:
          </Typography>
          <Typography variant="body1" paragraph>
            Email: tendaimachaya12@gmail.com
          </Typography>
          <Typography variant="body1" paragraph>
            Phone: +233 500 285 848
          </Typography>
          <Typography variant="body1" paragraph>
            Address: 1 University Ave, Berekuso
          </Typography>
    </Box>
  );
};

export { AboutSection, ServicesSection, ContactSection };
