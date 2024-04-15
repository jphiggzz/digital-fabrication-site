import { Printer } from '@/types/Printer';
import { db } from '@/firebase/firestore';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

// Reference to the printers collection in Firestore
const printerCollectionRef = collection(db, 'printers');

// Creates a new printer in the database
export const addPrinter = async (printer: Omit<Printer, 'id'>): Promise<Printer> => {
    const newPrinterRef = doc(printerCollectionRef);
    const newPrinter: Printer = {
        id: newPrinterRef.id,
        ...printer,
        imageUrl: 'https://example.com/default-image.jpg' // Set a default image URL
    };
    await setDoc(newPrinterRef, newPrinter);
    return newPrinter;
};

// Get a single printer by id
export const getPrinter = async (id: string): Promise<Printer | undefined> => {
    const printerRef = doc(db, 'printers', id);
    const printerSnap = await getDoc(printerRef);
    // If the printer exists, return it; otherwise, return undefined
    if (printerSnap.exists()) {
        return printerSnap.data() as Printer;
    } else {
        return undefined;
    }
};

// Get all printers
export const getPrinters = async (): Promise<Printer[]> => {
    const snapshot = await getDocs(printerCollectionRef);
    return snapshot.docs.map(doc => doc.data() as Printer);
};

// Update a printer
export const updatePrinter = async (id: string, printer: Partial<Printer>): Promise<void> => {
    const printerRef = doc(db, 'printers', id);
    await updateDoc(printerRef, printer);
};

// Delete a printer
export const deletePrinter = async (id: string): Promise<void> => {
    const printerRef = doc(db, 'printers', id);
    await deleteDoc(printerRef);
};
