import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeSelection from '@/pages/student/time-selection';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

describe('TimeSelection', () => {
  const renderTimeSelection = () => {
    render(
      <SessionProvider session={null}>
        <ChakraProvider>
          <TimeSelection />
        </ChakraProvider>
      </SessionProvider>
    );
  };

  it('renders the time selection page with event listing and add event form', () => {
    renderTimeSelection();
    expect(screen.getByText(/Events on/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Event' })).toBeInTheDocument();
  });

  it('allows navigation between days', () => {
    renderTimeSelection();
    const nextDayButton = screen.getByRole('button', { name: 'Next day' });
    const prevDayButton = screen.getByRole('button', { name: 'Previous day' });

    fireEvent.click(nextDayButton);
    expect(screen.getByText(/Events on/)).toHaveTextContent(/Tomorrow/);

    fireEvent.click(prevDayButton);
    expect(screen.getByText(/Events on/)).toHaveTextContent(/Today/);
  });
});
