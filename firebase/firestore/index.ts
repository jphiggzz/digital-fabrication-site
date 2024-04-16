import {getFirestore} from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

import clientApp from '@/firebase/index';

const db = getFirestore(clientApp); //firestore instance
const storage = getStorage(clientApp); //storage instance

export { db, storage };