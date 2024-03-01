import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: 'openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
          // Include any other scopes you need
        },
      },
    }),
    // other providers as needed
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
  // Your NextAuth configuration...
});
