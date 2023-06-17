import { Box, SxProps } from '@mui/material';
import React from 'react';
import BrandLogo from '../Logo';

const Header: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <BrandLogo />
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
};

export default Header;
