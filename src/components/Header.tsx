'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        padding: '1rem 0',
      }}
    >
      <Toolbar 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{
            fontWeight: 700,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Monkey Timer
        </Typography>
        <Box>
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
