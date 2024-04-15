import { db } from '@/firebase/firestore/index'; // Adjust this path as per your project structure
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { TimeSlot } from '@/types/TimeSlot';

// Reference to the timeslots collection in Firestore
const timeSlotCollectionRef = collection(db, 'timeslots');

// Create a new timeslot
export const addTimeSlot = async (timeSlot: Omit<TimeSlot, 'id'>): Promise<TimeSlot> => {
    const newTimeSlotRef = doc(timeSlotCollectionRef);
    const newTimeSlot: TimeSlot = {
        id: newTimeSlotRef.id,
        ...timeSlot
    };
    await setDoc(newTimeSlotRef, newTimeSlot);
    return newTimeSlot;
};

// Get a single timeslot by id
export const getTimeSlot = async (id: string): Promise<TimeSlot | undefined> => {
    const timeSlotRef = doc(db, 'timeslots', id);
    const timeSlotSnap = await getDoc(timeSlotRef);

    if (timeSlotSnap.exists()) {
        return timeSlotSnap.data() as TimeSlot;
    } else {
        return undefined;
    }
};

// Get all timeslots
export const getTimeSlots = async (): Promise<TimeSlot[]> => {
    const snapshot = await getDocs(timeSlotCollectionRef);
    return snapshot.docs.map(doc => doc.data() as TimeSlot);
};

// Update a timeslot
export const updateTimeSlot = async (id: string, timeSlot: Partial<TimeSlot>): Promise<void> => {
    const timeSlotRef = doc(db, 'timeslots', id);
    await updateDoc(timeSlotRef, timeSlot);
};

// Delete a timeslot
export const deleteTimeSlot = async (id: string): Promise<void> => {
    const timeSlotRef = doc(db, 'timeslots', id);
    await deleteDoc(timeSlotRef);
};
