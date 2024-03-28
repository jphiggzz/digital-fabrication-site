import {collection, doc} from "firebase/firestore";

import db from "@/firebase/firestore";

import {PRINTER_COLLECTION} from "@/firebase/firestore/collectionNames";

export const printersCollection = collection(db, PRINTER_COLLECTION);

export const printersDoc = (id: string) => doc(printersCollection, id);4
