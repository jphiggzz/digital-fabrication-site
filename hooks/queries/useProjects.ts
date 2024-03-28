import {useState} from "react";

import {Boat, CupHolder, Dinosaur} from "@/assets/gallery-photos";

const dummyProjects = [
    { title: 'Boat', imageUrl: Boat.src, description: 'Edit this Print' },
    { title: 'Cup Holder', imageUrl: CupHolder.src, description: 'Edit this Print' },
    { title: 'Dinosaur', imageUrl: Dinosaur.src, description: 'Edit this Print' },
];

const useProjects = () => {

    const [projects, setProjects] = useState(dummyProjects);

    return { projects };
}

export default useProjects;