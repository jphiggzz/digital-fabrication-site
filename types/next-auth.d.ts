import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session types to include the custom session properties.
   */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    // Add any other custom session properties here
  }
}
