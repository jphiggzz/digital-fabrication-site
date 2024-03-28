import db from '@/firebase/firestore/index'; // Adjust this path as per your project structure
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { User } from '@/types/User';

// Reference to the users collection in Firestore
const userCollectionRef = collection(db, 'users');

// Create a new user
export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const newUserRef = doc(userCollectionRef);
    const newUser: User = {
        id: newUserRef.id,
        ...user
    };
    await setDoc(newUserRef, newUser);
    return newUser;
};

// Get a single user by id
export const getUser = async (id: string): Promise<User | undefined> => {
    const userRef = doc(db, 'users', id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as User;
    } else {
        return undefined;
    }
};

// Get all users
export const getUsers = async (): Promise<User[]> => {
    const snapshot = await getDocs(userCollectionRef);
    return snapshot.docs.map(doc => doc.data() as User);
};

// Update a user
export const updateUser = async (id: string, user: Partial<User>): Promise<void> => {
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, user);
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
    const userRef = doc(db, 'users', id);
    await deleteDoc(userRef);
};
