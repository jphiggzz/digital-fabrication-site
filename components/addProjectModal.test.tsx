import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddPrintModal from '@/components/addProjectModal';
import { useAddPrint } from '../hooks/useAddProject';

// Correctly mock useAddPrint with a default implementation
jest.mock('../hooks/useAddProject', () => ({
  useAddPrint: jest.fn(() => ({
    addPrint: jest.fn(),
    isLoading: false
  }))
}));

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    ...originalModule,
    useToast: jest.fn()
  };
});

describe('AddPrintModal', () => {
  it('should display the modal when isOpen is true', () => {
    render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText('Add a new 3D print')).toBeInTheDocument();
  });

  it('should not display the modal content when isOpen is false', () => {
    render(<AddPrintModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText('Add a new 3D print')).not.toBeInTheDocument();
  });

  it('should allow entering a name, description, and file', () => {
    render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText('Name of the print'), { target: { value: 'Test Print' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Description' } });

    
    expect(screen.getByPlaceholderText('Name of the print')).toHaveValue('Test Print');
    expect(screen.getByPlaceholderText('Description')).toHaveValue('Test Description');
  });

  it('should display a toast warning when submitting with empty fields', async () => {
    const useToast = require('@chakra-ui/react').useToast;
    const mockToast = jest.fn();
    useToast.mockImplementation(() => mockToast);

    render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Save'));

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: "Please fill in all fields.",
      status: "warning"
    }));
  });

  it('calls onClose and addPrint when fields are filled and Save is clicked', async () => {
    const onCloseMock = jest.fn();
    render(<AddPrintModal isOpen={true} onClose={onCloseMock} />);
    fireEvent.change(screen.getByPlaceholderText('Name of the print'), { target: { value: 'Test Print' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Description' } });

    fireEvent.click(screen.getByText('Save'));

    const { addPrint } = useAddPrint();
    expect(addPrint).toHaveBeenCalled(); // Check if addPrint was called
    expect(onCloseMock).toHaveBeenCalled(); // Check if onClose was called after save

    it('should handle file input changes correctly', () => {
        const mockFile = new File(['dummy content'], 'testfile.txt', { type: 'text/plain' });
        render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
      
        const fileInput = screen.getByLabelText('File Input');
      
        fireEvent.change(fileInput, { target: { files: [mockFile] } });
      
        expect(screen.getByText('File selected: testfile.txt')).toBeInTheDocument();
      });
      
      it('handles file selection correctly', () => {
        const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
        render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
        const fileInput = screen.getByLabelText('Your file input label');
        fireEvent.change(fileInput, { target: { files: [mockFile] } });
        
      });

      it('handles no file being selected', () => {
        render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
        const fileInput = screen.getByLabelText('Your file input label');
        fireEvent.change(fileInput, { target: { files: [] } }); // Simulate file input being cleared
        
      });      
  });
});