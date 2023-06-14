import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';
describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />);

    const logoText = screen.getByText(/Job/);
    const logoText2 = screen.getByText(/Finder/);

    expect(logoText).toBeInTheDocument();
    expect(logoText2).toBeInTheDocument();
  });
});
