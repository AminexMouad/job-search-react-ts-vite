import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';
const OfflineAlert: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <SignalWifiConnectedNoInternet4Icon
        htmlColor='orange'
        sx={{
          fontSize: '30px',
        }}
      />
      <Typography variant='h5' color='orange' fontWeight={500}>
        Warning: You're offline
      </Typography>
    </Box>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #dcdcdcdc',
    flexDirection: 'column',
    gap: '10px',
    padding: '15px 0',
  } as SxProps,
};

export default OfflineAlert;
