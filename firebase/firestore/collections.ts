// firebase/firestore/collections.ts
import db from './index';
import { collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

// Function to add a time slot document to Firestore
export const addTimeSlot = async (timeSlot: TimeSlot): Promise<void> => {
    const timeSlotsCollection = collection(db, 'time-slots');
    await addDoc(timeSlotsCollection, timeSlot);
};

// Function to retrieve all time slots from Firestore
export const getTimeSlots = async (): Promise<TimeSlot[]> => {
    const querySnapshot = await getDocs(collection(db, 'time-slots'));
    return querySnapshot.docs.map(doc => doc.data() as TimeSlot);
};

export const TIME_SLOT_COLLECTION = 'timeSlots';

// Interface for a TimeSlot document
export interface TimeSlot {
    id: string; // Unique identifier for the time slot
    label: string; // Human-readable label (e.g., '9:00 AM - 10:00 AM')
    startDateTime: string; // ISO string for start time
    endDateTime: string; // ISO string for end time
    reserved: boolean; // Indicates if the slot is reserved
    studentEmail: string | null; // Email of the student who reserved the slot, null if not reserved
    printerId: string | null; // ID of the printer reserved, null if not reserved
    printerName: string | null;
  }