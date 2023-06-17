import React from 'react';
import { useAppState } from '../hooks/useApp';

import useCheckConnectionState from '../hooks/useCheckConnectionState';

import OfflineAlert from '../components/OfflineAlert';
import { Box, SxProps } from '@mui/material';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

interface ConnectionCheckerProps {
  showHeader?: boolean;
}

const ConnectionChecker: React.FC<ConnectionCheckerProps> = ({
  showHeader = true,
}) => {
  useCheckConnectionState();
  const { isAppOnline } = useAppState();

  return (
    <Box sx={styles.container}>
      {!isAppOnline && <OfflineAlert />}
      {showHeader && <Header />}

      <Box sx={styles.content}>
        <Outlet />
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  } as SxProps,
  content: {
    flex: 1,
    maxHeight: '100%',
    overflowY: 'scroll',
  } as SxProps,
};

export default ConnectionChecker;
