import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {addProject, uploadImage, uploadPrinterFile} from "@/services/projects";

const useAddProject = () => {

    const toast = useToast();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [printerFile, setPrinterFile] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        if (!imageFile || !title || !description || !printerFile) return;

        setIsLoading(true);

        const imageUrl = await uploadImage(imageFile);

        const printerFileUrl = await uploadPrinterFile(printerFile);

        if (!imageUrl || !printerFileUrl) return;

        await addProject({
            title,
            imageUrl,
            description,
            printerFileUrl,
        });

        setIsLoading(false);

        toast({
            title: "Project added successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    }

    return {
        title,
        setTitle,
        description,
        setDescription,
        imageFile,
        setImageFile,
        printerFile,
        setPrinterFile,
        onSubmit,
        isLoading,
    }
}

export default useAddProject;