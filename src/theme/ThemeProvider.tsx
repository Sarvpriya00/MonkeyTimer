'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';

import { createCustomTheme, ThemeName, themeNames } from './theme';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  themeNames: ThemeName[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  // Default to 'default' theme or get from localStorage
  const [themeName, setThemeName] = useState<ThemeName>('default');
  const [theme, setTheme] = useState<Theme>(createCustomTheme('default'));

  // Load saved theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme && themeNames.includes(savedTheme)) {
      setThemeName(savedTheme);
      setTheme(createCustomTheme(savedTheme));
    }
  }, []);

  // Function to change the theme
  const changeTheme = (newThemeName: ThemeName) => {
    if (themeNames.includes(newThemeName)) {
      setThemeName(newThemeName);
      setTheme(createCustomTheme(newThemeName));
      localStorage.setItem('theme', newThemeName);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme: changeTheme,
        themeNames,
      }}
    >
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
