import {addDoc, collection} from "@firebase/firestore";
import {getDownloadURL, uploadBytes} from "@firebase/storage";

import {storageRef} from "@/firebase/storage";

import {PROJECTS_COLLECTION} from "@/firebase/firestore/collections";
import {db} from "@/firebase/firestore";

import {Project} from "@/types/Project";

export const uploadImage = async (file: File): Promise<string> => {
    const res = await uploadBytes(storageRef(Math.random().toString(36).substring(2, 15)), file);
    return getDownloadURL(res.ref);
}

export const uploadPrinterFile = async (file: File): Promise<string> => {
    const res = await uploadBytes(storageRef(Math.random().toString(36).substring(2, 15)), file);
    return getDownloadURL(res.ref);

}

export const addProject = async (project: Project): Promise<void> => {
    await addDoc(collection(db, PROJECTS_COLLECTION), project);
}