import {updateDoc, deleteDoc, addDoc} from 'firebase/firestore';

import { TimeSlot } from '@/types/TimeSlot';

import {timeSlotsCollection, timeSlotsDoc} from "@/firebase/firestore/collections/timeSlots";

// Create a new timeslot
export const addTimeSlot = async (timeSlot: Omit<TimeSlot, 'id'>): Promise<boolean> =>
    addDoc(timeSlotsCollection, timeSlot)
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error adding document: ', error);
            return false;
        });

// Update a timeslot
export const updateTimeSlot = async (id: string, timeSlot: Partial<TimeSlot>): Promise<boolean> =>
    updateDoc(timeSlotsDoc(id), timeSlot)
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error updating document: ', error);
            return false;
        });

// Delete a timeslot
export const deleteTimeSlot = async (id: string): Promise<boolean> =>
    deleteDoc(timeSlotsDoc(id))
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error deleting document: ', error);
            return false;
        });