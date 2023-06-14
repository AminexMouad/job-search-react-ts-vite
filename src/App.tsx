import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routing from './routes';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient({})}>
        <Routing />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
