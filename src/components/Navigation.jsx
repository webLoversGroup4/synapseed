import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Badge, InputBase, alpha, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useUserState } from '../contexts/ContextProvider'; 

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { currentUser, logout } = useUserState(); 

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    // Navigate to settings page
    window.location.href = '/settings';
  };

  const handleProfile = () => {
    // Navigate to profile page
    window.location.href = '/profile';
  };

  const handleLogout = () => {
    logout(); 
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#800000' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Logo />
          </Link>
        </Typography>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '16px' }}>
          <form onSubmit={handleSearch}>
            <div style={{ position: 'relative', backgroundColor: alpha('#ffffff', 0.15), borderRadius: 4, marginRight: 1 }}>
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon sx={{ color: '#ffffff' }} />
              </IconButton>
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: '#ffffff', '&::placeholder': { color: '#ffffff' } }}
              />
            </div>
          </form>
        </div>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/chat" sx={{ mr: 2 }}>
          Group Chat
        </Button>
        <Button color="inherit" component={Link} to="/details" sx={{ mr: 2 }}>
          Papers
        </Button>

        {/* Profile Menu */}
        <IconButton color="inherit" onClick={handleMenuClick}>
          <AccountCircleIcon />
        </IconButton>
        <Typography variant="body1" sx={{ color: 'white', display: 'inline-block', marginRight: '12px' }}>
          {currentUser ? currentUser.full_name : ''}
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {currentUser && (
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Edit Profile
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
