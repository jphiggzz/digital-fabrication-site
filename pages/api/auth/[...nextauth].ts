import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { db } from '@/firebase/firestore/index';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// This is the configuration for the Google OAuth provider
// It is used to authenticate users with Google and to obtain an access token
// which can be used to make requests to the Google Calendar API

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          // Authorize scope to access user's calendar
          scope: 'openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Explicitly declare the accessToken type
          if (account && user) {
              // Save or update user in Firestore
              const userRef = doc(db, "users", user.id);
              const userSnap = await getDoc(userRef);

              if (!userSnap.exists()) {
                  // New user, set additional data in Firestore
                  await setDoc(userRef, {
                      id: user.id,
                      email: user.email,
                      name: user.name,
                      role: 'user'  // Assign default role
                  });
                  token.role = 'user';
              } else {
                  // Existing user, read role from Firestore
                  const userData = userSnap.data();
                  token.role = userData.role;
              }

              token.accessToken = account.access_token;
          }
      return token;
    },
    async session({ session, token }) {
      // Ensure the accessToken is treated as a string (or undefined if not present)
      session.accessToken = (token as JWT).accessToken as string | undefined;
      return session;
    },
  },
});
