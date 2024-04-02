import {
    collection, doc,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {PRINTER_COLLECTION} from "@/firebase/firestore/collections";

import {Printer} from "@/types/Printer";


const courseConverter: FirestoreDataConverter<Printer> = {
    toFirestore(printer: WithFieldValue<Printer>): DocumentData {
        return { id: printer.id, name: printer.name, description: printer.description };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Printer {
        const data = snapshot.data(options);
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl
        };
    },
};