import React from 'react';
import { useAppState } from '../hooks/useApp';
import useCheckConnectionState from '../hooks/useCheckConnectionState';
import OfflineAlert from '../components/OfflineAlert';
import { Box, SxProps } from '@mui/material';
import { Outlet } from 'react-router-dom';

const ConnectionChecker: React.FC = () => {
  useCheckConnectionState();
  const { isAppOnline } = useAppState();

  return (
    <Box sx={styles.container}>
      {!isAppOnline && <OfflineAlert />}
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
