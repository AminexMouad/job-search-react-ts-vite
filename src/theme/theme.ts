import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: 'rgb(0,155,196)' },
    secondary: { main: 'rgb(0,155,196)' },
  },
  typography: {
    fontFamily: ['Poppins', 'Lato', 'Roboto'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '34px',
          padding: '12px 16px',
        },
        containedError: {
          backgroundColor: '#D0011B',
          color: 'white',
        },
      },
    },
  },
});

export default theme;
