import './App.css';
import Routing from './routes';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './stores/AppStore';
import { AuthProvider } from './stores/AuthStore';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient({})}>
        <AppProvider>
          <AuthProvider>
            <Routing />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </AppProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
