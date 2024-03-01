import {getFirestore} from "@firebase/firestore";

import clientApp from "../index";

const firestore = getFirestore(clientApp);

export default firestore;