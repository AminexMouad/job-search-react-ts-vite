import { render, screen } from '@testing-library/react';
import GenericComponentState from '../../components/Generic';
import { AxiosError } from 'axios';

describe('GenericComponentState', () => {
  it('should render component with children correctly', () => {
    render(
      <GenericComponentState
        refetch={() => {
          return;
        }}>
        <h1>Test children</h1>
      </GenericComponentState>
    );

    const childrenText = screen.getByText(/Test children/);

    expect(childrenText).toBeDefined();
    expect(childrenText).toBeInTheDocument();
  });

  it('should render error message if error is passed as a prop', async () => {
    const response = {
      response: {
        status: 500,
        statusText: 'Internal Server Error',
      },
    } as AxiosError;

    render(
      <GenericComponentState
        error={response}
        refetch={() => {
          return;
        }}>
        <h1>Test children</h1>
      </GenericComponentState>
    );

    const errorTextTitle = screen.getByText(/Server Error/);

    expect(errorTextTitle).toBeInTheDocument();
  });

  it('should render not data message if noData is passed as a prop', async () => {
    render(
      <GenericComponentState
        noData
        refetch={() => {
          return;
        }}>
        <h1>Test children</h1>
      </GenericComponentState>
    );

    const noDataTitle = screen.getByText(/No data found/i);
    const noDataSubtitle = screen.getByText(/Sorry, we couldn't/i);

    expect(noDataTitle).toBeInTheDocument();
    expect(noDataSubtitle).toBeInTheDocument();
  });
});
