import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container, SxProps, TextField, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BrandLogo from '../components/Logo';
import { useAuth, LoginBody } from '../hooks/useAuth';
import { AxiosError } from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    broadKey: yup.string().required('Broad key is required'),
    apiKey: yup.string().max(255).required('Api key is required'),
  });

  const { loginMutation } = useAuth();

  const errorResponse = loginMutation.error as AxiosError;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      broadKey: '',
      apiKey: '',
    },
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: LoginBody) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/', {
          replace: true,
        });
      },
    });
  };

  return (
    <Container>
      <Box sx={styles.centeredContainer}>
        <Box mb={'35px'}>
          <BrandLogo />
          <Typography variant='h6' textAlign={'center'}>
            Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder='Broad key'
            fullWidth
            {...register('broadKey')}
            error={!!errors.broadKey}
            helperText={errors.broadKey?.message}
          />
          <TextField
            placeholder='API KEY'
            fullWidth
            type='password'
            sx={{ marginTop: '10px' }}
            error={!!errors.apiKey}
            {...register('apiKey')}
            helperText={errors.apiKey?.message}
          />
          <Typography sx={styles.errorText}>
            {loginMutation.isError && errorResponse.message}
          </Typography>
          <LoadingButton
            fullWidth
            loading={loginMutation.isLoading}
            variant='contained'
            sx={{ mt: '20px' }}
            type='submit'>
            Login
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
};

const styles = {
  errorText: {
    fontSize: '13px',
    color: '#D0011B',
  } as SxProps,
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  } as SxProps,
};

export default Login;
