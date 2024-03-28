import {collection, doc} from "firebase/firestore";

import db from "@/firebase/firestore";

import {USER_COLLECTION} from "@/firebase/firestore/collectionNames";

export const usersCollection = collection(db, USER_COLLECTION);

export const usersDoc = (id: string) => doc(usersCollection, id);
