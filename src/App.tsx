import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routing from './routes';

function App() {
  return (
    <QueryClientProvider client={new QueryClient({})}>
      <Routing />
    </QueryClientProvider>
  );
}

export default App;
