// Type definition for the User object
// This stores information about a user in the system
export interface User {
    id: string; // Unique identifier for the user
    email: string; // Email of the user
    name: string; // Name of the user
    role: 'admin' | 'user'; // Role of the user
}
