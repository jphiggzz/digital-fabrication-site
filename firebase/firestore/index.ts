import {getFirestore} from "@firebase/firestore";
import clientApp from "..";

const db = getFirestore(clientApp); //firestore instance

export default db;