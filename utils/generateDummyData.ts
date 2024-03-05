
import { TimeSlot } from '../types/firestore-types';

function getRandomPrinter() {
  const printers = ['filament', 'powder', 'plastic'];
  return printers[Math.floor(Math.random() * printers.length)];
}

export function generateDummyTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let i = 0; i < 5; i++) {
    const start = new Date();
    start.setHours(9 + i, 0, 0, 0);
    const end = new Date(start.getTime());
    end.setHours(start.getHours() + 1);

    slots.push({
      id: `slot-${i}`,
      label: `${start.toISOString()} - ${end.toISOString()}`,
      startDateTime: start.toISOString(),
      endDateTime: end.toISOString(),
      reserved: Math.random() > 0.5,
      studentEmail: Math.random() > 0.5 ? 'student@example.com' : null,
      printerId: Math.random() > 0.5 ? `printer-${i}` : null,
      printerName: getRandomPrinter(),
    });
  }
  return slots;
}