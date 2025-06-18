import { createTheme, Theme } from '@mui/material/styles';

// Define the theme interface
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
}

// Define our color themes
const themes: Record<string, ThemeColors> = {
  // Default theme (MonkeyType inspired)
  default: {
    primary: '#e2b714',
    secondary: '#d1d0c5',
    background: '#323437',
    paper: '#2c2e31',
    text: '#e2b714',
    textSecondary: '#d1d0c5',
    success: '#7e57c2',
    warning: '#e2b714',
    error: '#ca4754',
  },
  // Dark theme
  dark: {
    primary: '#7e57c2',
    secondary: '#b39ddb',
    background: '#121212',
    paper: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    success: '#66bb6a',
    warning: '#ffa726',
    error: '#f44336',
  },
  // Light theme
  light: {
    primary: '#1976d2',
    secondary: '#9c27b0',
    background: '#f5f5f5',
    paper: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  // High contrast theme
  highContrast: {
    primary: '#00ff00',
    secondary: '#00ffff',
    background: '#000000',
    paper: '#111111',
    text: '#ffffff',
    textSecondary: '#cccccc',
    success: '#00ff00',
    warning: '#ffff00',
    error: '#ff0000',
  },
   // 1. Ocean Breeze
   oceanBreeze: {
    primary: '#00bcd4',
    secondary: '#4dd0e1',
    background: '#e0f7fa',
    paper: '#ffffff',
    text: '#006064',
    textSecondary: '#4f9a94',
    success: '#26a69a',
    warning: '#ffb74d',
    error: '#ef5350',
  },

  // 2. Midnight Blue
  midnightBlue: {
    primary: '#3f51b5',
    secondary: '#7986cb',
    background: '#0d1117',
    paper: '#161b22',
    text: '#c9d1d9',
    textSecondary: '#8b949e',
    success: '#2ea043',
    warning: '#d29922',
    error: '#f85149',
  },

  // 3. Sunset
  sunset: {
    primary: '#ff7043',
    secondary: '#ffa726',
    background: '#fff3e0',
    paper: '#fff8e1',
    text: '#e65100',
    textSecondary: '#f57c00',
    success: '#66bb6a',
    warning: '#ffa726',
    error: '#e53935',
  },

  // 4. Forest
  forest: {
    primary: '#2e7d32',
    secondary: '#81c784',
    background: '#e8f5e9',
    paper: '#ffffff',
    text: '#1b5e20',
    textSecondary: '#4caf50',
    success: '#43a047',
    warning: '#ffb74d',
    error: '#c62828',
  },

  // 5. Cyberpunk
  cyberpunk: {
    primary: '#ff0080',
    secondary: '#00ffe7',
    background: '#0f0f0f',
    paper: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#c0c0c0',
    success: '#00ff90',
    warning: '#ffc107',
    error: '#ff1744',
  },

  // 6. Pastel Dream
  pastelDream: {
    primary: '#ba68c8',
    secondary: '#4fc3f7',
    background: '#fce4ec',
    paper: '#f8bbd0',
    text: '#6a1b9a',
    textSecondary: '#ad1457',
    success: '#81c784',
    warning: '#fff176',
    error: '#e57373',
  },

  // 7. Monochrome
  monochrome: {
    primary: '#424242',
    secondary: '#757575',
    background: '#f5f5f5',
    paper: '#e0e0e0',
    text: '#212121',
    textSecondary: '#616161',
    success: '#9e9e9e',
    warning: '#bdbdbd',
    error: '#f44336',
  },

  // 8. Royal
  royal: {
    primary: '#673ab7',
    secondary: '#9575cd',
    background: '#ede7f6',
    paper: '#ffffff',
    text: '#311b92',
    textSecondary: '#512da8',
    success: '#4caf50',
    warning: '#ffb300',
    error: '#d50000',
  },

  // 9. Solarized Light
  solarizedLight: {
    primary: '#268bd2',
    secondary: '#2aa198',
    background: '#fdf6e3',
    paper: '#eee8d5',
    text: '#657b83',
    textSecondary: '#93a1a1',
    success: '#859900',
    warning: '#b58900',
    error: '#dc322f',
  },

  // 10. Solarized Dark
  solarizedDark: {
    primary: '#268bd2',
    secondary: '#2aa198',
    background: '#002b36',
    paper: '#073642',
    text: '#839496',
    textSecondary: '#93a1a1',
    success: '#859900',
    warning: '#b58900',
    error: '#dc322f',
  },
  // 11. Lavender Mist
  lavenderMist: {
    primary: '#9575cd',
    secondary: '#ce93d8',
    background: '#f3e5f5',
    paper: '#ede7f6',
    text: '#4a148c',
    textSecondary: '#6a1b9a',
    success: '#81c784',
    warning: '#ffb74d',
    error: '#e57373',
  },

  // 12. Coffee Cream
  coffeeCream: {
    primary: '#6d4c41',
    secondary: '#bcaaa4',
    background: '#efebe9',
    paper: '#d7ccc8',
    text: '#3e2723',
    textSecondary: '#5d4037',
    success: '#8bc34a',
    warning: '#ff9800',
    error: '#d84315',
  },

  // 13. Arctic Ice
  arcticIce: {
    primary: '#00acc1',
    secondary: '#4dd0e1',
    background: '#e0f7fa',
    paper: '#ffffff',
    text: '#004d40',
    textSecondary: '#00695c',
    success: '#26a69a',
    warning: '#ffd54f',
    error: '#ef5350',
  },

  // 14. Sakura Blossom
  sakuraBlossom: {
    primary: '#f48fb1',
    secondary: '#ffccbc',
    background: '#fff0f5',
    paper: '#ffe4e1',
    text: '#880e4f',
    textSecondary: '#ad1457',
    success: '#aed581',
    warning: '#ffca28',
    error: '#e53935',
  },

  // 15. Slate
  slate: {
    primary: '#607d8b',
    secondary: '#90a4ae',
    background: '#eceff1',
    paper: '#cfd8dc',
    text: '#263238',
    textSecondary: '#455a64',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },

  // 16. Desert Storm
  desertStorm: {
    primary: '#a1887f',
    secondary: '#d7ccc8',
    background: '#f5f5f5',
    paper: '#fbe9e7',
    text: '#4e342e',
    textSecondary: '#6d4c41',
    success: '#8bc34a',
    warning: '#ffb74d',
    error: '#e57373',
  },

  // 17. Noir
  noir: {
    primary: '#ffffff',
    secondary: '#b0bec5',
    background: '#0a0a0a',
    paper: '#1c1c1c',
    text: '#ffffff',
    textSecondary: '#9e9e9e',
    success: '#66bb6a',
    warning: '#ffa726',
    error: '#ef5350',
  },

  // 18. Neo Mint
  neoMint: {
    primary: '#a8e6cf',
    secondary: '#dcedc1',
    background: '#f0fff0',
    paper: '#ffffff',
    text: '#00695c',
    textSecondary: '#00796b',
    success: '#81c784',
    warning: '#ffe082',
    error: '#ff8a65',
  },

  // 19. Crimson Night
  crimsonNight: {
    primary: '#c62828',
    secondary: '#ad1457',
    background: '#1a0000',
    paper: '#2c0a0a',
    text: '#fbe9e7',
    textSecondary: '#ef9a9a',
    success: '#66bb6a',
    warning: '#ffb300',
    error: '#d32f2f',
  },

  // 20. Steel Blue
  steelBlue: {
    primary: '#4682b4',
    secondary: '#b0c4de',
    background: '#f8f9fa',
    paper: '#e3eaf1',
    text: '#1c2833',
    textSecondary: '#566573',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
  },
   // 21. Midnight Shadow
   midnightShadow: {
    primary: '#5e35b1',
    secondary: '#7c4dff',
    background: '#0e0e2c',
    paper: '#1c1c3c',
    text: '#e1e1ff',
    textSecondary: '#9e9ed9',
    success: '#66bb6a',
    warning: '#ffa726',
    error: '#ef5350',
  },

  // 22. Deep Space
  deepSpace: {
    primary: '#00bcd4',
    secondary: '#009688',
    background: '#0b0f12',
    paper: '#101518',
    text: '#e0f7fa',
    textSecondary: '#80cbc4',
    success: '#4db6ac',
    warning: '#ffc107',
    error: '#f44336',
  },

  // 23. Obsidian
  obsidian: {
    primary: '#ff7043',
    secondary: '#ffa726',
    background: '#121212',
    paper: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#bdbdbd',
    success: '#81c784',
    warning: '#ffd54f',
    error: '#e57373',
  },

  // 24. Dark Forest
  darkForest: {
    primary: '#388e3c',
    secondary: '#66bb6a',
    background: '#0f1a0f',
    paper: '#1c2c1c',
    text: '#e8f5e9',
    textSecondary: '#a5d6a7',
    success: '#43a047',
    warning: '#fbc02d',
    error: '#d32f2f',
  },

  // 25. Vampire
  vampire: {
    primary: '#c62828',
    secondary: '#ad1457',
    background: '#1b0a0a',
    paper: '#2a0f0f',
    text: '#fce4ec',
    textSecondary: '#ef9a9a',
    success: '#81c784',
    warning: '#ffb74d',
    error: '#e53935',
  },

  // 26. Carbon
  carbon: {
    primary: '#90caf9',
    secondary: '#b0bec5',
    background: '#121212',
    paper: '#1e1e1e',
    text: '#e0e0e0',
    textSecondary: '#9e9e9e',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },

  // 27. Cyber Grid
  cyberGrid: {
    primary: '#00ffc3',
    secondary: '#00aaff',
    background: '#030303',
    paper: '#101010',
    text: '#e0f7fa',
    textSecondary: '#81d4fa',
    success: '#00e676',
    warning: '#ffee58',
    error: '#ff1744',
  },

  // 28. Terminal Green
  terminalGreen: {
    primary: '#00ff00',
    secondary: '#33ff33',
    background: '#000000',
    paper: '#0d0d0d',
    text: '#00ff00',
    textSecondary: '#66ff66',
    success: '#00ff00',
    warning: '#ffff00',
    error: '#ff3333',
  },

  // 29. Noir Pink
  noirPink: {
    primary: '#ec407a',
    secondary: '#f06292',
    background: '#141414',
    paper: '#1f1f1f',
    text: '#f8bbd0',
    textSecondary: '#f48fb1',
    success: '#66bb6a',
    warning: '#ffb74d',
    error: '#ef5350',
  },

  // 30. Gameboy Dark
  gameboyDark: {
    primary: '#8bc34a',
    secondary: '#cddc39',
    background: '#1a1f16',
    paper: '#232d1f',
    text: '#dce775',
    textSecondary: '#afb42b',
    success: '#aed581',
    warning: '#fff176',
    error: '#ef5350',
  },
};

// Create a MUI theme from our color theme
export const createCustomTheme = (themeName: string): Theme => {
  const colors = themes[themeName] || themes.default;
  
  return createTheme({
    palette: {
      mode: themeName === 'dark' || themeName === 'default' ? 'dark' : 'light',
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: colors.background,
        paper: colors.paper,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
      success: {
        main: colors.success,
      },
      warning: {
        main: colors.warning,
      },
      error: {
        main: colors.error,
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.5rem',
      },
      h3: {
        fontWeight: 500,
        fontSize: '2rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 24px',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 12,
          },
        },
      },
    },
  });
};

export const themeNames = Object.keys(themes);

export type ThemeName = keyof typeof themes;
