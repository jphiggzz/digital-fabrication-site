import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { updateUser } from "@/services/user";
import { Admin } from "@/types/Admin";

// React hook for adding an admin user.
const useAddAdmin = (initialUser: Admin) => {
    const toast = useToast();
    // initialize email state
    const [email, setEmail] = useState<string>(initialUser.email);
    // initialize name state
    const [name, setName] = useState<string>(initialUser.name);

    // Loading state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Async function to add new admin
    const onSubmit = async () => {
        if (!email || !name) {
            // Toast notification if either field is empty
            toast({
                title: "Failed to update.",
                description: "You must fill out all fields.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        try {
            // Update user information
            await updateUser(initialUser.id, { email, name });
            // Successful toast
            toast({
                title: "User updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            // Unsuccessful toast
            toast({
                title: "Failed to update user.",
                description: "There was an issue updating the user details.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error("Error updating user: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        name,
        setName,
        onSubmit,
        isLoading,
    };
};

export default useAddAdmin;
