import { useCollection } from "react-firebase-hooks/firestore";
import { resourcesCollectionRef } from "@/firebase/firestore/converters/resourceConverter";

const useResources = () => {
    const [snapshot, loading, error] = useCollection(resourcesCollectionRef);

    const resources = snapshot ? snapshot.docs.map(doc => ({
        ...doc.data() // Spread the rest of the document data
    })) : [];

    return {
        resources,
        loading,
        error
    };
}

export default useResources;
