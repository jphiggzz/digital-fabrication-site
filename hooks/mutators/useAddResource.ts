import { useState } from "react";
import { addResource } from "@/services/resource"; // Assuming this is the service function to add a document
import { useToast } from "@chakra-ui/react";

const useAddResource = () => {
    const toast = useToast();

    // State hooks for the document details
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    // Function to handle the submission of the new document
    const onSubmit = async () => {
        const success = await addResource({
            name,
            description,
            url
        });

        // Toast notification depending on the outcome of the addDocument function
        if (success) {
            toast({
                title: "Document added!",
                description: "The document has been added to the system.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: "An error occurred.",
                description: "There was an error adding the document.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    // Return the state and the onSubmit function so they can be used in components
    return { name, setName, description, setDescription, url, setUrl, onSubmit };
};

export default useAddResource;
