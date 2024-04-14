import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Button, TextField, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../contexts/ContextProvider';

const UserProfile = () => {

  const [profile, setProfile] = useState(null);
  const [totalUploads, setTotalUploads] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newBio, setNewBio] = useState('');
  const [activeField, setActiveField] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useUserState(); 
  const { user_id, full_name } = currentUser;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': user_id,
            'X-Full-Name': full_name,
          },
          credentials: 'include',
        };

        const response = await fetch('http://16.16.90.16/synapseed/api/actions/profile.php', requestOptions);

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfile(data.profile);
        setTotalUploads(data.totalUploads);
	    setTotalMessages(data.totalMessages);
	    setTotalComments(data.totalComments);
        setNewEmail(data.profile.email || '');
        setNewUsername(data.profile.fname || '');
        setNewBio(data.profile.bio || '');
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [user_id, full_name]);

  const handleUpdateField = async (fieldName, value) => {
    try {
      const payload = { [fieldName]: value };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user_id,
          'X-Full-Name': full_name,
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      };

      const response = await fetch('http://16.16.90.16/synapseed/api/actions/update_profile.php', requestOptions);

      if (!response.ok) {
        throw new Error('Failed to update ' + fieldName);
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(`Error updating ${fieldName}:`, error);
      alert(`Failed to update ${fieldName}`);
    }
  };

  const handleUpdateEmail = () => {
    handleUpdateField('email', newEmail);
  };

  const handleUpdateUsername = () => {
    handleUpdateField('fname', newUsername);
  };

  const handleUpdateBio = () => {
    handleUpdateField('bio', newBio);
  };

  const toggleField = (field) => {
    setActiveField(activeField === field ? '' : field);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        <Typography variant="h2" gutterBottom>
          Profile Details
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">Username</Typography>
                <Typography>{newUsername}</Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ mt: 3 }}>
                  {activeField === 'username' && (
                    <TextField
                      label="New Username"
                      variant="outlined"
                      fullWidth
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  )}
                  <Button
                    onClick={() => toggleField('username')}
                    variant="contained"
                    color="secondary"
                    sx={{
                          backgroundColor: '#800000',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#5b0000' },mr: 2
                        }}

                  >
                    Update Name
                  </Button>
                  <Button onClick={handleUpdateUsername} variant="outlined" color="primary" sx={{
                          backgroundColor: '#800000',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#5b0000' },
                        }}>
                    Save
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">Email</Typography>
                <Typography>{newEmail}</Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ mt: 3 }}>
                  {activeField === 'email' && (
                    <TextField
                      label="New Email"
                      variant="outlined"
                      fullWidth
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  )}
                  <Button
                    onClick={() => toggleField('email')}
                    variant="contained"
                    color="secondary"
                    sx={{
                          backgroundColor: '#800000',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#5b0000' },mr: 2
                        }}
                  >
                    Update Email
                  </Button>
                  <Button onClick={handleUpdateEmail} variant="contained" color="primary" sx={{
                          backgroundColor: '#800000',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#5b0000' },
                        }}>
                    Save
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Bio</Typography>
                <Typography>{newBio || 'No Bio'}</Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ mt: 3 }}>
                  {activeField === 'bio' && (
                    <TextField
                      label="New Bio"
                      variant="outlined"
                      fullWidth
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  )}
                  <Button
                    onClick={() => toggleField('bio')}
                    variant="contained"
                    color="secondary"
                    sx={{
                          backgroundColor: '#800000',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#5b0000' },mr: 2
                        }}
                  >
                    Update Bio
                  </Button>
                  <Button onClick={handleUpdateBio} variant="contained" color="primary" 
                        sx={{
                          backgroundColor: '#800000',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#5b0000' },
                        }}
                     >
                    Save
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{totalUploads}</Typography>
                <Typography>Total Uploads</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{totalMessages}</Typography>
                <Typography>Total Messages Sent</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{totalComments}</Typography>
                <Typography>Total Comments</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>        
      </Box>
    </Container>
  );
};

export default UserProfile;
