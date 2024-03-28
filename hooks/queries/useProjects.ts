import {useState} from "react";

import {Boat, CupHolder, Dinosaur} from "@/assets/gallery-photos";
import {Project} from "@/types/Project";

const dummyProjects: Project[] = [
    { title: 'Boat', imageUrl: Boat.src, description: 'Edit this Print' },
    { title: 'Cup Holder', imageUrl: CupHolder.src, description: 'Edit this Print' },
    { title: 'Dinosaur', imageUrl: Dinosaur.src, description: 'Edit this Print' },
];

const useProjects = () => {

    const [projects, setProjects] = useState<Project[]>(dummyProjects);

    return { projects };
}

export default useProjects;