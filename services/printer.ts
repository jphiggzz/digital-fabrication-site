import { Printer } from '@/types/Printer';

import {updateDoc, deleteDoc, addDoc} from 'firebase/firestore';

import {printersCollection, printersDoc} from "@/firebase/firestore/collections/printers";

// Reference to the printers collection in Firestore

// Creates a new printer in the database
export const addPrinter = async (printer: Omit<Printer, 'id'>): Promise<boolean> =>
    addDoc(printersCollection, printer)
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error adding document: ', error);
            return false;
        });

// Update a printer
export const updatePrinter = async (id: string, printer: Partial<Omit<Printer, "id">>): Promise<boolean> =>
    updateDoc(printersDoc(id), printer)
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error updating document: ', error);
            return false;
        })

// Delete a printer
export const deletePrinter = async (id: string): Promise<boolean> =>
    deleteDoc(printersDoc(id))
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error deleting document: ', error);
            return false;
        })
