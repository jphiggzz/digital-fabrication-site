import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import { db } from "@/firebase/firestore";
import { RESOURCES_COLLECTION } from "@/firebase/firestore/collections"; 
import { Resource } from "@/types/Resource";

const resourceConverter: FirestoreDataConverter<Resource> = {
    toFirestore(resource: WithFieldValue<Resource>): DocumentData {
        // Mapping the Resource object to a Firestore document format, excluding the 'id' as Firestore manages it
        return {
            name: resource.name,
            description: resource.description,
            url: resource.url
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Resource {
        const data = snapshot.data(options);
        // Reconstructing the Resource object from Firestore document data
        return {
            id: snapshot.id, // Using the document's ID from Firestore as the resource ID
            name: data.name,
            description: data.description,
            url: data.url
        };
    },
};

export const resourcesCollectionRef = collection(db, RESOURCES_COLLECTION).withConverter(resourceConverter);
