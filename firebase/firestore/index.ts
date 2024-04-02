import {getFirestore} from "@firebase/firestore";

import clientApp from "../index";

const db = getFirestore(clientApp); //firestore instance

export default db;