import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: 'rgb(0,155,196)' },
    secondary: { main: '#0A2540' },
  },
  typography: {
    fontFamily: ['Poppins', 'Lato', 'Roboto'].join(','),
    h4: {
      fontWeight: 500,
    },
    body1: {
      color: '#808080',
    },
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
