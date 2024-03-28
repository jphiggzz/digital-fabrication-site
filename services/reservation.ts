import { updateDoc, deleteDoc, addDoc} from 'firebase/firestore';

import {reservationsCollection, reservationsDoc} from "@/firebase/firestore/collections/reservations";

import { Reservation } from '@/types/Reservation';


// Create a new reservation
export const addReservation = async (reservation: Omit<Reservation, 'id'>): Promise<boolean> =>
    addDoc(reservationsCollection, reservation)
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error adding document: ', error);
            return false;
        });

// Update a reservation
export const updateReservation = async (id: string, reservation: Partial<Omit<Reservation, "id">>): Promise<boolean> =>
    updateDoc(reservationsDoc(id), reservation)
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error updating document: ', error);
            return false;
        });

// Delete a reservation
export const deleteReservation = async (id: string): Promise<boolean> =>
    deleteDoc(reservationsDoc(id))
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error deleting document: ', error);
            return false;
        })
