import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/Navbar';

describe('Header (Navbar)', () => {
  it('renders the header with navigation links and call to action', () => {
    render(<Navbar />);
    expect(screen.getByText('Digital Fabrication Lab')).toBeInTheDocument();

    const navLinks = ['Reservations', 'Resources', 'Project Gallery'];
    navLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });

    expect(screen.getByText('Go to Homepage')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to Homepage' })).toHaveAttribute('href', 'https://www.digitalfabricationlab.com');
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
  });
});
