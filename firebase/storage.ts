import {getStorage, ref} from "firebase/storage";

import app from "@/firebase/index";

const storage = getStorage(app);

export const storageRef = (url: string) => ref(storage, url);