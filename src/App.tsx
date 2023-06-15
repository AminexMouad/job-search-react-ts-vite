import './App.css';
import Routing from './routes';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './stores/AppStore';
import ConnectionChecker from './layouts/ConnectionChecker';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient({})}>
        <AppProvider>
          <ConnectionChecker>
            <Routing />
          </ConnectionChecker>
          <ReactQueryDevtools initialIsOpen={false} />
        </AppProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
