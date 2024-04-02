import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHeader from '@/components/AdminHeader';

describe('AdminHeader', () => {
  // Test for rendering the Admin Panel title
  it('renders the Admin Panel title', () => {
    render(<AdminHeader />);
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  // Test for rendering navigation links
  it('renders navigation links', () => {
    render(<AdminHeader />);
    const navLinks = ['Printers', 'Reservations', 'Project Gallery', 'Resources'];
    navLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  // Test for the presence of the profile icon link
  it('renders the profile icon link', () => {
    render(<AdminHeader />);
    const profileLink = screen.getByRole('link', { name: '' });
    expect(profileLink).toHaveAttribute('href', '/admin/profile');
    expect(profileLink).toContainElement(screen.getByTestId('profile-icon'));
  });
});
