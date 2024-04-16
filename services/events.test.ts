// reservations.test.ts
import { addEvent, getReservation, getEvents, updateEvent, deleteEvent } from './events';
import { db } from '@/firebase/firestore/index';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

jest.mock('@/firebase/firestore/index', () => {
  return {
    db: {},
  };
});

jest.mock('firebase/firestore', () => {
  return {
    collection: jest.fn(),
    doc: jest.fn(),
    addDoc: jest.fn(),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
  };
});

describe('Firestore reservation operations', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe('addEvent', () => {
    it('should call addDoc with the correct parameters', async () => {
      const mockAddDoc = jest.fn();
      (addDoc as jest.Mock) = mockAddDoc;
  
      const newEvent: Event = {
      };

      await addEvent(newEvent);
  
      expect(mockAddDoc).toHaveBeenCalledWith(expect.anything(), newEvent);
    });
  });

  describe('getReservation', () => {
    it('should call getDoc with the correct parameters', async () => {
      const mockGetDoc = jest.fn();
      (getDoc as jest.Mock) = mockGetDoc;
  
      const id = 'someId';
      await getReservation(id);
  
      expect(mockGetDoc).toHaveBeenCalledWith(expect.anything());
    });
  });
  
  describe('getEvents', () => {
    it('should call getDocs', async () => {
      const mockGetDocs = jest.fn();
      (getDocs as jest.Mock) = mockGetDocs;
  
      await getEvents();
  
      expect(mockGetDocs).toHaveBeenCalledWith(expect.anything());
    });
  });
  
  describe('updateEvent', () => {
    it('should call updateDoc with the correct parameters', async () => {
      const mockUpdateDoc = jest.fn();
      (updateDoc as jest.Mock) = mockUpdateDoc;
  
      const id = 'someId';
      const eventUpdates = {/* your event updates here */};
      await updateEvent(id, eventUpdates);
  
      expect(mockUpdateDoc).toHaveBeenCalledWith(expect.anything(), eventUpdates);
    });
  });

  describe('deleteEvent', () => {
    it('should call deleteDoc with the correct parameters', async () => {
      const mockDeleteDoc = jest.fn();
      (deleteDoc as jest.Mock) = mockDeleteDoc;
  
      const id = 'someId';
      await deleteEvent(id);
  
      expect(mockDeleteDoc).toHaveBeenCalledWith(expect.anything());
    });
  });
  
});
