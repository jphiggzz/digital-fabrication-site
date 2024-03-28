import {collection, doc} from "firebase/firestore";

import db from "@/firebase/firestore";

import {RESERVATION_COLLECTION} from "@/firebase/firestore/collectionNames";
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";
import {Reservation} from "@/types/Reservation";

const reservationConverter: FirestoreDataConverter<Reservation> = {
    toFirestore(reservation: WithFieldValue<Reservation>): DocumentData {
        return {
            studentName: reservation.studentName,
            studentEmail: reservation.studentEmail,
            printerId: reservation.printerId,
            printerName: reservation.printerName,
            startDateTime: reservation.startDateTime,
            endDateTime: reservation.endDateTime,
            label: reservation.label,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Reservation {
        const data = snapshot.data(options);
        return {
            studentName: data.studentName,
            studentEmail: data.studentEmail,
            printerId: data.printerId,
            printerName: data.printerName,
            startDateTime: data.startDateTime,
            endDateTime: data.endDateTime,
            id: data.id,
            label: data.label,
        };
    },
};
export const reservationsCollection = collection(db, RESERVATION_COLLECTION)
    .withConverter(reservationConverter);

export const reservationsDoc = (id: string) => doc(reservationsCollection, id);