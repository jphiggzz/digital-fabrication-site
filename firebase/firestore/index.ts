import {getFirestore} from "@firebase/firestore";
import clientApp from "..";
import { getStorage } from 'firebase/storage';


const db = getFirestore(clientApp); //firestore instance
const storage = getStorage(clientApp); //storage instance

export { db, storage };