import {
    addPrinter,
    getPrinter,
    getPrinters,
    updatePrinter,
    deletePrinter,
  } from '@/services/printer';
  import { Printer } from '@/types/Printer';
  import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
  } from 'firebase/firestore';
  
  // Mock Firestore functions
  jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(() => ({ id: 'test-id' })),
    setDoc: jest.fn(),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
  }));
  
  describe('Printer Service', () => {
    it('addPrinter should create a new printer and return it with an id and default image URL', async () => {
      const testPrinter: Omit<Printer, 'id'> = {
        name: 'Printer 1',
        description: 'available',
        imageUrl: 'https://example.com/default-image.jpg'
      };
  
      const expectedPrinter: Printer = {
        ...testPrinter,
        id: 'test-id',
        imageUrl: 'https://example.com/default-image.jpg',
      };
  
      const result = await addPrinter(testPrinter);
  
      expect(result).toEqual(expectedPrinter);
      expect(setDoc).toHaveBeenCalledWith(expect.anything(), expectedPrinter);
    });
  
    it('getPrinter should return a printer by id', async () => {
      const expectedPrinter: Printer = {
        id: 'test-id',
        name: 'Printer 1',
        description: 'description',
        imageUrl: 'https://example.com/default-image.jpg',
      };
  
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => expectedPrinter,
      });
  
      const result = await getPrinter('test-id');
  
      expect(result).toEqual(expectedPrinter);
    });
  
    it('getPrinters should return an array of printers', async () => {
      const expectedPrinters: Printer[] = [
        {
          id: 'test-id-1',
          name: 'Printer 1',
          description: 'description',
          imageUrl: 'https://example.com/default-image.jpg',
        },
        {
          id: 'test-id-2',
          name: 'Printer 2',
          description: 'description',
          imageUrl: 'https://example.com/default-image.jpg',
        },
      ];
  
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: expectedPrinters.map(printer => ({
          data: () => printer,
        })),
      });
  
      const result = await getPrinters();
  
      expect(result).toEqual(expectedPrinters);
    });
  
    it('updatePrinter should update a printer by id', async () => {
      const updates: Partial<Printer> = {
        description: 'busy',
      };
  
      await updatePrinter('test-id', updates);
  
      expect(updateDoc).toHaveBeenCalledWith(expect.anything(), updates);
    });
  
    it('deletePrinter should remove a printer by id', async () => {
      await deletePrinter('test-id');
  
      expect(deleteDoc).toHaveBeenCalledWith(expect.anything());
    });
  });
  