// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B39DDB', // Pastel purple
    },
    secondary: {
      main: '#80DEEA', // Pastel teal
    },
    background: {
      default: '#F3E5F5', // Light pastel background
    },
    text: {
      primary: '#4A148C', // Dark purple for text
      secondary: '#004D40', // Dark teal for secondary text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          backgroundColor: 'rgba(179, 157, 219, 0.8)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(128, 222, 234, 0.8)',
          },
        },
      },
    },
  },
});

export default theme;
