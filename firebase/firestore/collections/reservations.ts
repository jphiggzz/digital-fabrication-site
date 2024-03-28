import {collection, doc} from "firebase/firestore";

import db from "@/firebase/firestore";

import {RESERVATION_COLLECTION} from "@/firebase/firestore/collectionNames";

export const reservationsCollection = collection(db, RESERVATION_COLLECTION);

export const reservationsDoc = (id: string) => doc(reservationsCollection, id);
