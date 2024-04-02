import { addReservation } from '@/services/reservation';
import { Reservation } from '@/types/Reservation';
import { setDoc, doc } from '@firebase/firestore';

jest.mock('@firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(() => ({ id: 'test-id' })),
  setDoc: jest.fn(),
}));

describe('addReservation', () => {
  it('should add a new reservation and return it with an id', async () => {
    const testReservation: Omit<Reservation, 'id'> = {
      studentName: 'John Doe',
      studentEmail: 'john.doe@example.com',
      printerId: 'printer1',
      printerName: 'Printer 1',
      label: 'Test Label',
      startDateTime: '2024-03-20T09:00:00',
      endDateTime: '2024-03-20T10:00:00',
    };

    const expectedReservation: Reservation = {
      ...testReservation,
      id: 'test-id',
    };

    const result = await addReservation(testReservation);

    expect(result).toEqual(expectedReservation);
    expect(setDoc).toHaveBeenCalledWith(expect.anything(), expectedReservation);
  });
});
