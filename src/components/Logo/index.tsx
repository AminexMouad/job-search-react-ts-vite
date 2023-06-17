import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';

const BrandLogo: React.FC = () => {
  return (
    <Box sx={styles.logoContainer}>
      <Typography
        sx={{ ...styles.logoText, color: theme.palette.primary.main }}>
        Job
      </Typography>
      <Typography
        sx={{ ...styles.logoText, color: theme.palette.secondary.main }}>
        Finder
      </Typography>
    </Box>
  );
};

const styles = {
  logoContainer: {
    display: 'flex',
  } as SxProps,
  logoText: {
    fontSize: '25px',
    fontWeight: 600,
  },
};

export default BrandLogo;
