import {useCollectionData} from "react-firebase-hooks/firestore";

import {projectsCollectionRef} from "@/firebase/firestore/converters/projectConverter";

const useProjects = () => {

    const [projects, loading] = useCollectionData(projectsCollectionRef);

    return {
        projects: projects || [],
        loading
    };
}

export default useProjects;