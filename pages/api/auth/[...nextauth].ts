import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

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
    async jwt({ token, account }) {
      // Explicitly declare the accessToken type
      if (account && account.access_token) {
        token.accessToken = account.access_token as string;
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
