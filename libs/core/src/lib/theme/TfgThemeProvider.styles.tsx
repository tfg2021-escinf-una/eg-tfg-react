import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

export interface ThemeProps {
  mode : PaletteMode
  children : ReactNode
}

const darkConfig = () => {
  return {
    primary: {
      main: '#5893df',
      light: 'rgb(121, 168, 229)',
      dark: 'rgb(121, 168, 229)',
      contrastText: '#fff'
    },
    secondary: {
      main: '#2ec5d3',
      light: 'rgb(87, 208, 219)',
      dark: 'rgb(32, 137, 147)',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    warning : {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    background: {
      default: '#192231',
      paper: '#24344d',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)'
    },
  }
}

const lightConfig = () => {
  return {

  };
}

export const createCustomTheme = (mode : PaletteMode) => createTheme({
  palette: {
    mode : mode,
    ...(mode === 'dark'
      ? darkConfig()
      : lightConfig()
    ),
  },
  typography: {
    htmlFontSize: 20,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});


