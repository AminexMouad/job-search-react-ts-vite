import { Box, SxProps, Typography, useTheme } from '@mui/material';
import React from 'react';

const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.logoContainer}>
        <Typography
          sx={{ ...styles.logoText, color: theme.palette.primary.main }}>
          Job
        </Typography>
        <Typography
          sx={{ ...styles.logoText, color: theme.palette.secondary.main }}>
          Finder
        </Typography>
      </Typography>
    </Box>
  );
};

const styles = {
  container: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    p: '0 20px',
    borderBottom: '1px solid #dadadac9',
  } as SxProps,

  logoContainer: {
    display: 'flex',
  } as SxProps,
  logoText: {
    fontSize: '25px',
    fontWeight: 600,
  },
};

export default Header;
