import { Box, SxProps } from '@mui/material';
import React from 'react';

const Header: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <span>JobSearcher</span>
    </Box>
  );
};

const styles = {
  container: {} as SxProps,
};

export default Header;
