import React from 'react';
import { render, fireEvent, getByPlaceholderText, getByText } from '@testing-library/react';
import AddAdminModal from '@/components/addAdminModal';

describe('AddAdminModal', () => {
    test('renders the modal with the correct title', () => {
        const { getByText } = render(<AddAdminModal isOpen={true} onClose={() => { } } addAdmin={function (admin: { email: string; name: string; }): void {
            throw new Error('Function not implemented.');
        } } />);
        expect(getByText('Add Admin')).toBeInTheDocument();
    });

    test('does not render the modal when isOpen is false', () => {
        const { queryByText } = render(<AddAdminModal isOpen={false} onClose={() => { } } addAdmin={function (admin: { email: string; name: string; }): void {
            throw new Error('Function not implemented.');
        } } />);
        expect(queryByText('Add Admin')).toBeNull();
    });

    test('calls the onClose function when the cancel button is clicked', () => {
        const onClose = jest.fn();
        const { getByText } = render(<AddAdminModal isOpen={true} onClose={onClose} addAdmin={function (admin: { email: string; name: string; }): void {
            throw new Error('Function not implemented.');
        } } />);
        fireEvent.click(getByText('Cancel'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('does not call the onClose function when the cancel button is not clicked', () => {
        const onClose = jest.fn();
        const { getByText } = render(<AddAdminModal isOpen={true} onClose={onClose} addAdmin={function (admin: { email: string; name: string; }): void {
            throw new Error('Function not implemented.');
        } } />);
        expect(onClose).not.toHaveBeenCalled();
    });

    test('calls the onAddAdmin function with the correct values when the add button is clicked', () => {
        const onAddAdmin = jest.fn();
        const { getByPlaceholderText, getByText } = render(<AddAdminModal isOpen={true} onClose={() => {}} addAdmin={onAddAdmin} />);
        fireEvent.change(getByPlaceholderText('Enter admin email'), { target: { value: 'test@example.com' } });
        fireEvent.click(getByText('Add'));
        expect(onAddAdmin).toHaveBeenCalledWith('test@example.com');
    });

    test('does not call the onAddAdmin function when the add button is not clicked', () => {
        const onAddAdmin = jest.fn();
        const { getByPlaceholderText, getByText } = render(<AddAdminModal isOpen={true} onClose={() => {}} addAdmin={onAddAdmin} />);
        fireEvent.change(getByPlaceholderText('Enter admin email'), { target: { value: 'test@example.com' } });
        expect(onAddAdmin).not.toHaveBeenCalled();
    });

    test('displays an error message when the email is invalid', () => {
        const { getByPlaceholderText, getByText } = render(<AddAdminModal isOpen={true} onClose={() => { } } addAdmin={function (admin: { email: string; name: string; }): void {
            throw new Error('Function not implemented.');
        } } />);
        fireEvent.change(getByPlaceholderText('Enter admin email'), { target: { value: 'invalid-email' } });
        fireEvent.click(getByText('Add'));
        expect(getByText('Please enter a valid email address.')).toBeInTheDocument();
    });

    // test('does not display an error message when the email is valid', () => {
    //     const { queryByText } = render(<AddAdminModal isOpen={true} onClose={() => { } } addAdmin={function (admin: { email: string; name: string; }): void {
    //         throw new Error('Function not implemented.');
    //     } } />);
    //     fireEvent.change(getByPlaceholderText('Enter admin email'), { target: { value: 'test@example.com' } });
    //     fireEvent.click(getByText('Add'));
    //     expect(queryByText('Please enter a valid email address.')).toBeNull();
    // });

    test('displays an error message when the email is empty', () => {
        const { getByPlaceholderText, getByText } = render(<AddAdminModal isOpen={true} onClose={() => { } } addAdmin={function (admin: { email: string; name: string; }): void {
            throw new Error('Function not implemented.');
        } } />);
        fireEvent.change(getByPlaceholderText('Enter admin email'), { target: { value: '' } });
        fireEvent.click(getByText('Add'));
        expect(getByText('Please enter a valid email address.')).toBeInTheDocument();
    });

    // test('does not display an error message when the email is not empty', () => {
    //     const { queryByText } = render(<AddAdminModal isOpen={true} onClose={() => { } } addAdmin={function (admin: { email: string; name: string; }): void {
    //         throw new Error('Function not implemented.');
    //     } } />);
    //     fireEvent.change(getByPlaceholderText('Enter admin email'), { target: { value: 'test@example.com' } });
    //     expect(queryByText('Please enter a valid email address.')).toBeNull();
    // });
});