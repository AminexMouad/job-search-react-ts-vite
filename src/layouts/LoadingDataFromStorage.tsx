import { CircularProgress, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppState } from '../hooks/useApp';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useLoadDataFromStorage from '../hooks/useLoadDataFromStorage';
import { useAuthState } from '../hooks/useAuth';

const LoadingDataFromStorage: React.FC = () => {
  const { dataRetrievedFromStorage } = useAppState();
  const { isAuthenticated } = useAuthState();

  const navigate = useNavigate();
  const location = useLocation();
  useLoadDataFromStorage();

  useEffect(() => {
    if (dataRetrievedFromStorage) {
      if (isAuthenticated) {
        if (location.pathname === '/login') {
          navigate('/', {
            replace: true,
          });
        }
      } else {
        if (location.pathname !== '/login') {
          navigate('/login', {
            replace: true,
          });
        }
      }
    }
  }, [location, isAuthenticated, dataRetrievedFromStorage, navigate]);

  if (!dataRetrievedFromStorage) {
    return (
      <Container
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </Container>
    );
  } else {
    return <Outlet />;
  }
};

export default LoadingDataFromStorage;
