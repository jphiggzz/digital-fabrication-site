import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrintersPage from '@/pages/student/printing';
import { ChakraProvider } from '@chakra-ui/react';

describe('PrintersPage', () => {
  const renderPrintersPage = () => {
    render(
      <ChakraProvider>
        <PrintersPage />
      </ChakraProvider>
    );
  };

  it('renders the printers page with printer selection', () => {
    renderPrintersPage();
    expect(screen.getByText('Select a printer:')).toBeInTheDocument();

    const printerNames = ['Voron', 'MakerGear M3', 'Form 3'];
    printerNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('allows selecting a printer and entering print duration', () => {
    renderPrintersPage();
    const voronPrinterButton = screen.getByText('Voron')?.closest('div')?.querySelector('button');
    if (voronPrinterButton) {
      fireEvent.click(voronPrinterButton);
    }
    expect(voronPrinterButton).toHaveTextContent('Select');

    const hoursInput = screen.getByPlaceholderText('Hours');
    const minutesInput = screen.getByPlaceholderText('Minutes');
    fireEvent.change(hoursInput, { target: { value: '2' } });
    fireEvent.change(minutesInput, { target: { value: '30' } });
    expect(hoursInput).toHaveValue(2);
    expect(minutesInput).toHaveValue(30);

    const confirmButton = screen.getByText('Confirm Print');
    expect(confirmButton).toBeEnabled();
  });
});
