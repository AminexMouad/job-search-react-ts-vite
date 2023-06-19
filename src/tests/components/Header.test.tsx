import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
describe('Header', () => {
  it('renders correctly', () => {
    render(
      <QueryClientProvider client={new QueryClient({})}>
        <Header />
      </QueryClientProvider>
    );

    const logoText = screen.getByText(/Job/);
    const logoText2 = screen.getByText(/Finder/);

    expect(logoText).toBeInTheDocument();
    expect(logoText2).toBeInTheDocument();
  });
});
