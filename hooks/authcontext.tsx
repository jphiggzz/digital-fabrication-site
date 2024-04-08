import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import auth from '../firebase/auth';
import googleSignIn from './authFunctions';
import { NextRouter, useRouter } from 'next/router'; 
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firestore/index';

// Define a type for the context shape
interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    loading: boolean;
    signIn: (isAdmin: boolean, router: NextRouter) => Promise<void>;
    signOut: () => Promise<void>;
}

// Create a context with the default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    isAdmin: false,
    loading: true,
    signIn: async () => { },
    signOut: async () => { }
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                if (user.email) { 
                    const adminRef = doc(db, 'adminUsers', user.email);
                    const docSnap = await getDoc(adminRef);

                if (docSnap.exists()) {
                    setIsAdmin(true);
                }
                else {
                    setIsAdmin(false);
                }
            }

            } else {
                setIsAdmin(false);
                router.push('/');
            }
            setLoading(false);
        });

        return unsubscribe; // Properly cleanup on unmount
    }, []);

    const signIn = async (isAdmin: boolean, router: NextRouter) => {
        await googleSignIn(isAdmin, router);
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut: signOutUser }}>
            {children}
        </AuthContext.Provider>
    );
};