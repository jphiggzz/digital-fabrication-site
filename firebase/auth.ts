import { getAuth } from "@firebase/auth";
import clientApp from '@/firebase';

// Get the auth service for the default app
const auth = getAuth(clientApp)

export default auth;