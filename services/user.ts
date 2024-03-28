import {updateDoc, deleteDoc, addDoc} from 'firebase/firestore';

import {usersCollection, usersDoc} from "@/firebase/firestore/collections/users";

import { User } from '@/types/User';


// Create a new user
export const addUser = async (user: Omit<User, 'id'>): Promise<boolean> =>
    addDoc(usersCollection, user)
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error adding document: ', error);
            return false;
        });

// Update a user
export const updateUser = async (id: string, user: Partial<User>): Promise<boolean> =>
    updateDoc(usersDoc(id), user)
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error updating document: ', error);
            return false;
        });

// Delete a user
export const deleteUser = async (id: string): Promise<boolean> =>
    deleteDoc(usersDoc(id))
        .then(() => {return true;})
        .catch((error) => {
            console.error('Error deleting document: ', error);
            return false;
        });
