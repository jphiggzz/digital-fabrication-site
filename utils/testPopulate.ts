import { collection, addDoc, updateDoc } from 'firebase/firestore';
import db from '@/firebase/firestore/index'; // Adjust the path as necessary
import { TimeSlot } from '@/types/firestore-types'; // Adjust the path as necessary

const TIMESLOTS_COLLECTION = 'timeslots'; // Replace with your actual collection name

export const addTimeSlot = async (timeSlotInput: Omit<TimeSlot, 'id'>): Promise<boolean> => {
    try {
        // Create the document with the input data
        const docRef = await addDoc(collection(db, TIMESLOTS_COLLECTION), {
            ...timeSlotInput,
            reserved: false, // Assuming a new time slot is initially not reserved
            // other fields like studentEmail, printerId, printerName can be null initially
        });

        // Update the document with the ID
        await updateDoc(docRef, {
            id: docRef.id,
        });

        return true;
    } catch {
        return false;
    }
};
