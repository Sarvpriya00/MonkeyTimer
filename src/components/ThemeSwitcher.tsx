'use client';

import React from 'react';
import { useThemeContext } from '@/theme/ThemeProvider';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';
import { ThemeName } from '@/theme/theme';

const ThemeSwitcher: React.FC = () => {
  const { theme, themeName, setTheme, themeNames } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    handleClose();
  };

  return (
    <Box>
      <Tooltip title="Change theme">
        <IconButton
          onClick={handleClick}
          size="large"
          aria-label="change theme"
          color="inherit"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {themeNames.map((name) => (
          <MenuItem
            key={name}
            onClick={() => handleThemeChange(name as ThemeName)}
            selected={themeName === name}
            sx={{
              textTransform: 'capitalize',
              fontWeight: themeName === name ? 600 : 400,
              color: themeName === name ? theme.palette.primary.main : 'inherit',
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ThemeSwitcher;
