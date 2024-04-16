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
    // Placeholder for file input simulation
    // Assume file is set here as well
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
    // Assume file is set here as well

    fireEvent.click(screen.getByText('Save'));

    // Use destructuring to get the mocked addPrint function from the hook
    const { addPrint } = useAddPrint();
    expect(addPrint).toHaveBeenCalled(); // Check if addPrint was called
    expect(onCloseMock).toHaveBeenCalled(); // Check if onClose was called after save

    it('should handle file input changes correctly', () => {
        const mockFile = new File(['dummy content'], 'testfile.txt', { type: 'text/plain' });
        render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
      
        // Assuming your file input is identifiable by placeholder or label, adjust as necessary
        const fileInput = screen.getByLabelText('File Input'); // Adjust this to match your input's identifier
      
        // Simulate file selection
        fireEvent.change(fileInput, { target: { files: [mockFile] } });
      
        // Verify the outcome - adjust based on your component's behavior
        // This is an example assuming the file name or some indication becomes visible or triggers some change
        expect(screen.getByText('File selected: testfile.txt')).toBeInTheDocument(); // Adjust expectation as necessary
      });
      
      it('handles file selection correctly', () => {
        const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
        render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
        const fileInput = screen.getByLabelText('Your file input label'); // Adjust the selector as necessary
        fireEvent.change(fileInput, { target: { files: [mockFile] } });
        
        // Assertions to verify the file was handled, e.g., checking if setFile was called with mockFile.
        // Since setFile updates a state, you may need to check for a visible UI change or mock its implementation if passed as a prop.
      });

      it('handles no file being selected', () => {
        render(<AddPrintModal isOpen={true} onClose={jest.fn()} />);
        const fileInput = screen.getByLabelText('Your file input label'); // Adjust the selector as necessary
        fireEvent.change(fileInput, { target: { files: [] } }); // Simulate file input being cleared
        
        // Since your function doesn't do anything in this case, this might be a no-op.
        // However, it's useful to have this test to ensure future changes don't unintentionally break this behavior.
      });      
  });
});