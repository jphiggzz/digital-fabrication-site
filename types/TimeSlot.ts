// Type definition for the TimeSlot object
// This stores any time slot, reserved or unreserved
export interface TimeSlot {
    id: string; // Unique identifier for the time slot
    label: string; // Human-readable label (e.g., '9:00 AM - 10:00 AM')
    startDateTime: string; // ISO string for start time
    endDateTime: string; // ISO string for end time
  }
