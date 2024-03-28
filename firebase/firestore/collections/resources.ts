import {collection, doc} from "firebase/firestore";

import db from "@/firebase/firestore";

import {RESOURCES_COLLECTION} from "@/firebase/firestore/collectionNames";

export const resourcesCollection = collection(db, RESOURCES_COLLECTION);

export const resourcesDoc = (id: string) => doc(resourcesCollection, id);