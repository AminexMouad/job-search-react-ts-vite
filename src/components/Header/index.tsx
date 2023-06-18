import { Box, Button, SxProps, Typography } from '@mui/material';
import React from 'react';
import BrandLogo from '../Logo';
import theme from '../../theme/theme';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth, useAuthState } from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
import TuneIcon from '@mui/icons-material/Tune';

interface HeaderProps {
  openDrawer?: () => void;
}

const Header: React.FC<HeaderProps> = ({ openDrawer }) => {
  const { isAuthenticated } = useAuthState();
  const { isMobile } = useResponsive();

  const { logoutUser } = useAuth();

  return (
    <Box sx={styles.container(isMobile)}>
      {isMobile && (
        <Button onClick={openDrawer}>
          <TuneIcon htmlColor={theme.palette.secondary.main} />
        </Button>
      )}
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
  container: (isMobile: boolean) =>
    ({
      paddingLeft: !isMobile ? '20px' : 0,
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #dadadac9',
      justifyContent: 'space-between',
    } as SxProps),
  logoutContainer: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  } as SxProps,
};

export default Header;
