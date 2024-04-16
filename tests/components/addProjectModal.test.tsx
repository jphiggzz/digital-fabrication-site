// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import AddPrintModal from '@/pages/admin/printers';
// import useAddProject from '@/hooks/mutators/useAddProject';

// // Mock the external hook used in the component
// jest.mock('@/hooks/mutators/useAddProject', () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

// describe('AddPrintModal', () => {
//   const mockClose = jest.fn();
//   const mockSetTitle = jest.fn();
//   const mockSetDescription = jest.fn();
//   const mockSetImageFile = jest.fn();
//   const mockSetPrinterFile = jest.fn();
//   const mockOnSubmit = jest.fn();

//   beforeEach(() => {
//     (useAddProject as jest.Mock).mockImplementation(() => ({
//       title: '',
//       setTitle: mockSetTitle,
//       description: '',
//       setDescription: mockSetDescription,
//       imageFile: null,
//       setImageFile: mockSetImageFile,
//       printerFile: null,
//       setPrinterFile: mockSetPrinterFile,
//       onSubmit: mockOnSubmit,
//       isLoading: false,
//     }));
//     render(<AddPrintModal isOpen={true} onClose={mockClose} />);
//   });

//   it('should render input elements correctly', () => {
//     expect(screen.getByLabelText('Image')).toBeInTheDocument();
//     expect(screen.getByLabelText('3D Print File')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Title of the print')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
//   });

//   it('should handle file inputs correctly', () => {
//     const fileInput = screen.getByLabelText('Image');
//     const testFile = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
//     fireEvent.change(fileInput, { target: { files: [testFile] } });
//     expect(mockSetImageFile).toHaveBeenCalledWith(testFile);

//     const printFileInput = screen.getByLabelText('3D Print File');
//     const testPrintFile = new File(['content'], 'test.stl', { type: 'application/sla' });
//     fireEvent.change(printFileInput, { target: { files: [testPrintFile] } });
//     expect(mockSetPrinterFile).toHaveBeenCalledWith(testPrintFile);
//   });

//   it('should enable submission when all fields are filled', () => {
//     fireEvent.change(screen.getByPlaceholderText('Title of the print'), { target: { value: 'Awesome Print' } });
//     fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Description of the awesome print' } });

//     // Simulate setting files via state change
//     (useAddProject as jest.Mock).mockImplementation(() => ({
//       title: 'Awesome Print',
//       description: 'Description of the awesome print',
//       imageFile: new File(['(⌐□_□)'], 'test.png', { type: 'image/png' }),
//       printerFile: new File(['content'], 'test.stl', { type: 'application/sla' }),
//       setTitle: mockSetTitle,
//       setDescription: mockSetDescription,
//       setImageFile: mockSetImageFile,
//       setPrinterFile: mockSetPrinterFile,
//       onSubmit: mockOnSubmit,
//       isLoading: false,
//     }));

//     render(<AddPrintModal isOpen onClose={mockClose} />);
//     const saveButton = screen.getByText('Save');
//     expect(saveButton).not.toBeDisabled();
//     fireEvent.click(saveButton);
//     expect(mockOnSubmit).toHaveBeenCalled();
//   });

//   it('should call onClose when the Cancel button is clicked', () => {
//     fireEvent.click(screen.getByText('Cancel'));
//     expect(mockClose).toHaveBeenCalledTimes(1);
//   });
// });