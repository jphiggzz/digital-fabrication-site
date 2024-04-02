// import { render, screen, fireEvent } from '@testing-library/react';
// import ManageReservations from '@/components/ManageReservations';

// describe('ManageReservations', () => {
//   it('should display the current date', () => {
//     render(<ManageReservations />);
//     const formattedDate = new Intl.DateTimeFormat('en-US', {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric',
//     }).format(new Date());

//     expect(screen.getByText(`Reservations for ${formattedDate}`)).toBeInTheDocument();
//   });

//   it('should open the modal when a reservation is clicked', () => {
//     render(<ManageReservations />);
//     const manageButton = screen.getAllByText('Manage Reservation')[0];
//     fireEvent.click(manageButton);

//     expect(screen.getByText('Manage Reservation')).toBeInTheDocument();
//     expect(screen.getByText('Select an option below.')).toBeInTheDocument();
//   });
// });
