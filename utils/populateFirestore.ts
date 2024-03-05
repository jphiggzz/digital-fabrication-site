// utils/populateFirestore.ts
import { collection, doc, writeBatch } from 'firebase/firestore';
import db from '../firebase/firestore/index';
import { generateDummyTimeSlots } from './generateDummyData';

export async function populateFirestore() {
  const timeSlots = generateDummyTimeSlots();
  const batch = writeBatch(db);

  timeSlots.forEach((slot) => {
    // Create a reference for a new doc in the 'timeSlots' collection with a specific ID
    const docRef = doc(collection(db, 'timeSlots'), slot.id);
    // Queue a set operation in the batch
    batch.set(docRef, slot);
  });

  // Commit the batch
  await batch.commit();
}
