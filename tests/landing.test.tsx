import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentLanding from '@/pages/student/landing';
import { ChakraProvider } from '@chakra-ui/react';

describe('StudentLanding', () => {
  const renderStudentLanding = () => {
    render(
      <ChakraProvider>
        <StudentLanding />
      </ChakraProvider>
    );
  };

  it('renders the student landing page with reservation information', () => {
    renderStudentLanding();
    expect(screen.getByRole('heading', { name: 'Reservation Page' })).toBeInTheDocument();
    expect(screen.getByText('Use the Calendar to reserve a 3D printer for your project.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Make a Reservation' })).toBeInTheDocument();
  });

  it('navigates to the printer page when the Make a Reservation button is clicked', () => {
    renderStudentLanding();
    const reservationButton = screen.getByRole('link', { name: 'Make a Reservation' });
    expect(reservationButton).toHaveAttribute('href', '/printerpage');
  });
});
