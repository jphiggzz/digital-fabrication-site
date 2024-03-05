// Type definition for the TimeSlot object
// This stores any time slot, reserved or unreserved
export interface Reservation {
    id: string; // Unique identifier for the time slot
    label: string; // Human-readable label (e.g., '9:00 AM - 10:00 AM')
    startDateTime: string; // ISO string for start time
    endDateTime: string; // ISO string for end time
    studentEmail: string | null; // Email of the student who reserved the slot, null if not reserved
    printerId: string | null; // ID of the printer reserved, null if not reserved
    printerName: string | null;
  }

