import { Auth, GoogleAuthProvider } from 'firebase/auth';
import auth from "../firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '@/firebase/firestore/index';
import { NextRouter } from 'next/router';

const googleSignIn = async (isAdmin = false, router: NextRouter) => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Ensure user.email and user.displayName are not null before proceeding
        if (user.email && user.displayName) {
            const email = user.email;
            const name = user.displayName;

            // Push user's email and name to the "users" collection if it's a student email
            if (!isAdmin && email.endsWith('@vanderbilt.edu')) {
                const userRef = doc(db, "users", email);
                await setDoc(userRef, {
                    email: email,
                    name: name,
                    // Add additional user information here if needed
                });
            }

            if (isAdmin) {
                const adminRef = doc(db, "adminUsers", email);
                const adminSnap = await getDoc(adminRef);

                if (adminSnap.exists()) {
                    router.push('/admin/admin-landing');
                } else {
                    alert('You are not authorized as an admin.');
                    await signOut(auth);
                }
            } else {
                if (email.endsWith('@vanderbilt.edu')) {
                    console.log('Vanderbilt user logged in:', email);
                    router.push('/student/landing');
                } else {
                    alert('Please use a Vanderbilt University email.');
                    await signOut(auth);
                }
            }
        } else {
            console.error("Failed to retrieve email or displayName from Google profile.");
            await signOut(auth);
        }
    } catch (error) {
        console.error("Authentication failed:", error);
    }
};

export default googleSignIn;