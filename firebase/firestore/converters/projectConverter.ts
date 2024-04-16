import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import {db} from "@/firebase/firestore";

import {PROJECTS_COLLECTION} from "@/firebase/firestore/collections";

import {Project} from "@/types/Project";


const projectConverter: FirestoreDataConverter<Project> = {
    toFirestore(project: WithFieldValue<Project>): DocumentData {
        return {
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            printerFileUrl: project.printerFileUrl,
        }
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Project {
        const data = snapshot.data(options);
        return {
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            printerFileUrl: data.printerFileUrl,
        };
    },
};

export const projectsCollectionRef = collection(db, PROJECTS_COLLECTION).withConverter(projectConverter);