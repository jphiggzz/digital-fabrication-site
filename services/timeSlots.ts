import db from '@/firebase/firestore/index';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { TimeSlot } from '@/types/TimeSlot';

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