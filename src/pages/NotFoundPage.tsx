import { Button, Container, SxProps } from '@mui/material';
import Error404 from '../assets/svg/404-error.svg';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container sx={styles.container}>
      <img
        src={Error404}
        style={{
          maxWidth: '85%',
        }}
      />
      <Button
        variant='contained'
        sx={{ width: '50%' }}
        onClick={() =>
          navigate('/', {
            replace: true,
          })
        }>
        Back to home
      </Button>
    </Container>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  } as SxProps,
};

export default NotFoundPage;
