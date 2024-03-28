import {Resource} from "@/types/Resource";
import {useState} from "react";

const sampleResources: Resource[] = [
    { title: 'Resource 1', link: 'https://www.example.com/resource1', description: 'Description of Resource 1' },
    { title: 'Resource 2', link: 'https://www.example.com/resource2', description: 'Description of Resource 2' },
    { title: 'Resource 3', link: 'https://www.example.com/resource3', description: 'Description of Resource 3' },
];

const useResources = () => {

    const [resources, setResources] = useState<Resource[]>(sampleResources);

    return { resources };
}

export default useResources;