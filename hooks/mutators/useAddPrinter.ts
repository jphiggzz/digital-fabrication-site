import {useState} from "react";

import { addPrinter } from "@/services/printer";
import {useToast} from "@chakra-ui/react";

const useAddPrinter = () => {

    const toast = useToast();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');

    const onSubmit = async () => {
        const success = await addPrinter({
            name,
            description,
            imageUrl
        })
        if (success) {
            toast({
                title: "Printer added!",
                description: "The printer has been added to the system.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: "An error occurred.",
                description: "There was an error adding the printer.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }
}

export default useAddPrinter;