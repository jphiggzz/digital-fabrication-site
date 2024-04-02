import db from '@/firebase/firestore/index';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { Event } from '@/types/Event';
import { Printer } from '@/types/Printer'

// Reference to the events collection in Firestore
const eventCollectionRef = collection(db, 'reservations');

// Create a new reservation
export const addEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
    const newEventRef = doc(eventCollectionRef);
    const newEvent: Event = {
        id: newEventRef.id,
        ...event
    };
    await setDoc(newEventRef, newEvent);
    return newEvent;
};

// Get a single reservation by id
export const getReservation = async (id: string): Promise<Event | undefined> => {
    const eventRef = doc(db, 'reservations', id);
    const eventSnap = await getDoc(eventRef);

    if (eventSnap.exists()) {
        return eventSnap.data() as Event;
    } else {
        return undefined;
    }
};

// Get all reservations
export const getEvents = async () => {
    const eventsCollectionRef = collection(db, "reservations");
    try {
        const data = await getDocs(eventsCollectionRef);
    } catch (err) {
        console.error(err);
    }
};

// Update a reservation
export const updateEvent = async (id: string, event: Partial<Event>): Promise<void> => {
    const eventRef = doc(db, 'reservations', id);
    await updateDoc(eventRef, event);
};

// Delete a reservation
export const deleteEvent = async (id: string): Promise<void> => {
    const eventRef = doc(db, 'reservations', id);
    await deleteDoc(eventRef);
};