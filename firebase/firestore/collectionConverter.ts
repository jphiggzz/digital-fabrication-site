import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData } from 'firebase/firestore';
import { TimeSlot } from './collections';

export const timeSlotConverter: FirestoreDataConverter<TimeSlot> = {
  toFirestore(timeSlot: TimeSlot): DocumentData {
    return {
      label: timeSlot.label,
      startDateTime: timeSlot.startDateTime,
      endDateTime: timeSlot.endDateTime,
      reserved: timeSlot.reserved,
      studentEmail: timeSlot.studentEmail,
      printerId: timeSlot.printerId,
      printerName: timeSlot.printerName
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<TimeSlot>,
    options: SnapshotOptions
  ): TimeSlot {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      label: data.label,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      reserved: data.reserved,
      studentEmail: data.studentEmail,
      printerId: data.printerId,
      printerName: data.printerName
    };
  }
};
