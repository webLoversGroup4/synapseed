import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

function ToggleColorMode({ mode, toggleColorMode }) {
  const isDarkMode = mode === 'dark';

  const handleToggleColorMode = () => {
    toggleColorMode();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <Button
        variant="text"
        onClick={handleToggleColorMode}
        size="small"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        sx={{ p: '4px', color: 'inherit' }} // Use 'inherit' to inherit text color from parent
      >
        {isDarkMode ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </Box>
  );
}

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
