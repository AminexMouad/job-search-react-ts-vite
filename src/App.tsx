import './App.css';
import Routing from './routes';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
