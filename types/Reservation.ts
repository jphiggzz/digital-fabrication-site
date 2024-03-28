import { TimeSlot } from './TimeSlot';

// Type definition for the Reservation object
// This extends the TimeSlot object to include 
// the student's name and email 
// and the printer's ID and name

export interface Reservation extends TimeSlot {
    studentName: string; // Name of the student who reserved the slot
    studentEmail: string; // Email of the student who reserved the slot
    printerId: string; // ID of the printer reserved
    printerName: string; // Name of the printer reserved
  }
