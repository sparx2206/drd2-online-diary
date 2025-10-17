import { createTheme } from '@mui/material/styles';

// Material 3 Dark Theme with Red Buttons
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336', // Red color for buttons
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: 'rgba(30, 30, 30, 0.9)', // Semi-transparent for overlay
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // Material 3 rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
        contained: {
          backgroundColor: '#f44336',
          '&:hover': {
            backgroundColor: '#d32f2f',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#f44336',
            },
          },
        },
      },
    },
  },
});
