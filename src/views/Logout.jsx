import React from 'react';
import Button from '@mui/material/Button';
import { useUserState } from '../contexts/ContextProvider';
import router from '../router';

const Logout = () => {
  const { logout } = useUserState();

  const handleLogout = () => {
    logout(); 
    router.navigate('/homepage');
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
