import 'next-auth';

// Type declaration for next-auth session object
// This is used to add the accessToken and refreshToken to the session object

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
}
