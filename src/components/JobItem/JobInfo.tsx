import { Box, Typography } from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';

interface JobInfoProps {
  label: string;
  value?: string;
  children?: React.ReactNode;
}

const JobInfo: React.FC<JobInfoProps> = ({ label, children, value }) => {
  return (
    <Box mt={'10px'}>
      <Typography variant='h6' color={theme.palette.primary.main}>
        {label}
      </Typography>
      {value && (
        <Typography mt={!label ? '10px' : 0} variant='body1'>
          {value}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default JobInfo;
