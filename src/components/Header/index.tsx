import { Box, Button, SxProps, Typography } from '@mui/material';
import React from 'react';
import BrandLogo from '../Logo';
import theme from '../../theme/theme';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth, useAuthState } from '../../hooks/useAuth';
const Header: React.FC = () => {
  const { isAuthenticated } = useAuthState();

  const { logoutUser } = useAuth();

  return (
    <Box sx={styles.container}>
      <BrandLogo />
      {isAuthenticated && (
        <Button variant='text' sx={styles.logoutContainer} onClick={logoutUser}>
          <LogoutIcon htmlColor={theme.palette.secondary.main} />
          <Typography fontSize={'16px'} color={theme.palette.secondary.main}>
            Logout
          </Typography>
        </Button>
      )}
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
    justifyContent: 'space-between',
  } as SxProps,
  logoutContainer: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  } as SxProps,
};

export default Header;
