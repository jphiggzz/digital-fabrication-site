import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrintersPage from '@/pages/admin/printers';
import { Form3, MakerGearM3, Voron } from '@/assets/printer-photos';

jest.mock('@/firebase/firestore/index', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

describe('PrintersPage', () => {
  it('renders the printers page with printer selection', () => {
    render(<PrintersPage />);
    expect(screen.getByText('Select a printer:')).toBeInTheDocument();
    expect(screen.getByText('Voron')).toBeInTheDocument();
    expect(screen.getByText('MakerGear M3')).toBeInTheDocument();
    expect(screen.getByText('Form 3')).toBeInTheDocument();
  });

  it('opens the modal to add a new printer when the Add Printer button is clicked', () => {
    render(<PrintersPage />);
    const addButton = screen.getByText('Add Printer');
    fireEvent.click(addButton);
    expect(screen.getByText('Add Printer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('allows entering print duration for a selected printer', () => {
    render(<PrintersPage />);
    // Simulate selecting a printer
    const voronPrinter = screen.getByText('Voron').closest('div');
    if (voronPrinter) {
      fireEvent.click(voronPrinter);
    }
    // Enter print duration
    const hoursInput = screen.getByPlaceholderText('Hours');
    const minutesInput = screen.getByPlaceholderText('Minutes');
    fireEvent.change(hoursInput, { target: { value: '2' } });
    fireEvent.change(minutesInput, { target: { value: '30' } });
    expect(hoursInput).toHaveValue(2);
    expect(minutesInput).toHaveValue(30);
    // Confirm print
    const confirmButton = screen.getByText('Confirm Print');
    fireEvent.click(confirmButton);
    // From here, we should actually check for a result...
  });
});
