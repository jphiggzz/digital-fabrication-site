import db from '@/firebase/firestore/index';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { Event, formatDateToString } from '@/types/Event';
import { Printer } from '@/types/Printer'
import { parseISO } from 'date-fns'

// Reference to the events collection in Firestore
const eventCollectionRef = collection(db, 'reservations');

// Create a new reservation
export const addEvent = async (newEvent: Event)  => {
    try {
        const startDateTime = newEvent.startTime;
        const endDateTime = newEvent.endTime;



        // Add a new document in collection "reservations"
        const docRef = await addDoc(collection(db, "reservations"), {
            ...newEvent, // You might want to exclude the raw startTime and endTime here
            startTime: startDateTime,
            endTime: endDateTime,
        });
        console.log("Event added successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
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