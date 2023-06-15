import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
