import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders the footer with expected text', () => {
    render(<Footer />);
    expect(screen.getByText('Olin Hall, Vanderbilt University')).toBeInTheDocument();
    expect(screen.getByText('Chemical and Bio-molecular Engineering')).toBeInTheDocument();
  });
});
