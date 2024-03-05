import {getFirestore} from "@firebase/firestore";

import clientApp from "../index";

const db = getFirestore(clientApp);

export default db;