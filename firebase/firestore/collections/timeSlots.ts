import {collection, doc} from "firebase/firestore";

import db from "@/firebase/firestore";

import {TIME_SLOTS_COLLECTION} from "@/firebase/firestore/collectionNames";

export const timeSlotsCollection = collection(db, TIME_SLOTS_COLLECTION);

export const timeSlotsDoc = (id: string) => doc(timeSlotsCollection, id);
