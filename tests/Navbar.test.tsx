import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  it('renders the header with navigation links and call to action', () => {
    render(<Navbar />);
    expect(screen.getByText('Digital Fabrication Lab')).toBeInTheDocument();

    const navLinks = ['Reservations', 'Resources', 'Project Gallery'];
    navLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });

    // Check the "Go to Homepage" link
    const goToHomepageLink = screen.getByRole('link', { name: 'Go to Homepage' });
    expect(goToHomepageLink).toHaveAttribute('href', 'https://www.digitalfabricationlab.com');

    // Check the Profile icon button
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
  });
});
