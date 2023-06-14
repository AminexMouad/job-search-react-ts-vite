import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routing from './routes';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient({})}>
        <Routing />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
