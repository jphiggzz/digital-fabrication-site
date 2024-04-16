import { db } from '@/firebase/firestore';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

// Reference to the resources collection in Firestore
const resourceCollectionRef = collection(db, 'resources');

export interface Resource {
    id: string;
    name: string;
    description: string;
    url: string;
}

// Creates a new resource in the database
export const addResource = async (resource: Omit<Resource, 'id'>): Promise<Resource> => {
    const newResourceRef = doc(resourceCollectionRef);
    const newResource: Resource = {
        id: newResourceRef.id,
        ...resource,
        url: resource.url || 'https://example.com/default-placeholder-url' // Set a default URL if not provided
    };
    await setDoc(newResourceRef, newResource);
    return newResource;
};

// Deletes a resource from the database
export const deleteResource = async (resourceId: string): Promise<void> => {
    const resourceRef = doc(db, 'resources', resourceId);
    await deleteDoc(resourceRef);
};
