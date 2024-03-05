import { Printer } from '@/types/Printer';
import db from '@/firebase/firestore';
import { addDoc, collection } from "firebase/firestore";


export const addPrinter = async (printer : Printer): Promise<boolean> => {
    try {
        console.log("before addDoc")
        const docRef = await addDoc(collection(db, "printers"), {
          id: printer.id,
          name: printer.name,
          description: printer.description,
          numAvailable: printer.numAvailable
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
      } catch (e) {
        console.error("Error adding document: ", e);
        return false;
      }
};