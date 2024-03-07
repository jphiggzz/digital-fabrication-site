import db from '@/firebase/firestore/index'; // Adjust this path as per your project structure
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { Reservation } from '@/types/Reservation';

// Reference to the reservations collection in Firestore
const reservationCollectionRef = collection(db, 'reservations');

// Create a new reservation
export const addReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
    const newReservationRef = doc(reservationCollectionRef);
    const newReservation: Reservation = {
        id: newReservationRef.id,
        ...reservation
    };
    await setDoc(newReservationRef, newReservation);
    return newReservation;
};

// Get a single reservation by id
export const getReservation = async (id: string): Promise<Reservation | undefined> => {
    const reservationRef = doc(db, 'reservations', id);
    const reservationSnap = await getDoc(reservationRef);

    if (reservationSnap.exists()) {
        return reservationSnap.data() as Reservation;
    } else {
        return undefined;
    }
};

// Get all reservations
export const getReservations = async (): Promise<Reservation[]> => {
    const snapshot = await getDocs(reservationCollectionRef);
    return snapshot.docs.map(doc => doc.data() as Reservation);
};

// Update a reservation
export const updateReservation = async (id: string, reservation: Partial<Reservation>): Promise<void> => {
    const reservationRef = doc(db, 'reservations', id);
    await updateDoc(reservationRef, reservation);
};

// Delete a reservation
export const deleteReservation = async (id: string): Promise<void> => {
    const reservationRef = doc(db, 'reservations', id);
    await deleteDoc(reservationRef);
};
