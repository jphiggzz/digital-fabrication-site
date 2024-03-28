import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/auth/useAuth";

import {addReservation} from "@/services/reservation";
import {useState} from "react";
import {Printer} from "@/types/Printer";


const useAddReservation = (printer: Printer) => {

    const [label, setLabel] = useState<string>('');
    const [startDateTime, setStartDateTime] = useState<string>();
    const [endDateTime, setEndDateTime] = useState<string>();

    const { user } = useAuth();

    console.log(user);

    const toast = useToast();

    const onSubmit = async () => {
        if (!user) {
            toast({
                title: "An error occurred.",
                description: "You must be logged in to make a reservation.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        if(!label || !startDateTime || !endDateTime) {
            toast({
                title: "An error occurred.",
                description: "Please fill out all fields.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        const success = await addReservation({
            studentName: "Test User",
            studentEmail: "test@user.com",
            printerId: printer.id,
            printerName: printer.name,
            label,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
        });
        if (success) {
            toast({
                title: "Reservation added!",
                description: "The reservation has been added to the system.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: "An error occurred.",
                description: "There was an error adding the reservation.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return {
        label,
        setLabel,
        startDateTime,
        setStartDateTime,
        endDateTime,
        setEndDateTime,
        onSubmit,
        disabled: !label || !startDateTime || !endDateTime || !user,
    }
}

export default useAddReservation;