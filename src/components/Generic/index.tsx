import { Box, Button, SxProps, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { AxiosError } from 'axios';
import theme from '../../theme/theme';

interface GenericComponentStateProps {
  children: React.ReactNode;
  error?: AxiosError;
  noData?: boolean;
  refetch: () => void;
}

const GenericComponentState: React.FC<GenericComponentStateProps> = ({
  children,
  error,
  noData,
  refetch,
}) => {
  const relevantMessage = useMemo(() => {
    if (noData) {
      return {
        title: 'No Data Found',
        subtitle: "Sorry, we couldn't find any relevant data.",
      };
    } else {
      return {
        title: 'Server Error',
        subtitle: error?.message,
      };
    }
  }, [noData, error]);

  if (noData || error) {
    return (
      <Box sx={styles.container}>
        <SentimentVeryDissatisfiedIcon
          sx={{
            fontSize: '100px',
          }}
        />

        <Typography variant='h3' color={theme.palette.error.main}>
          {relevantMessage.title}
        </Typography>
        <Typography variant='h5' color={theme.palette.secondary.main}>
          {relevantMessage.subtitle}
        </Typography>
        {error && (
          <Button
            variant='contained'
            onClick={refetch}
            sx={{
              width: '250px',
              mt: '20px',
            }}>
            Try again
          </Button>
        )}
      </Box>
    );
  } else {
    return children;
  }
};

const styles = {
  container: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  } as SxProps,

  image: {
    width: '10%',
  },
};

export default GenericComponentState;
