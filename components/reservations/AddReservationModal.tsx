import React from 'react';

import {
    Button, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Text
} from "@chakra-ui/react";

import useAddReservation from "@/hooks/mutators/useAddReservation";

import {Printer} from "@/types/Printer";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    printer: Printer
}

const AddReservationModal: React.FC<Props> = ({ isOpen, onClose, printer }) => {

    const {
        label,
        setLabel,
        startDateTime,
        setStartDateTime,
        endDateTime,
        setEndDateTime,
        onSubmit,
        disabled,
    } = useAddReservation(printer);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Reservation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        Occasion
                    </Text>
                    <Input
                        placeholder="Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        mb={4}
                    />
                    <Text>
                        Start Date and Time
                    </Text>
                    <Input
                        type="datetime-local"
                        placeholder="Start Date"
                        value={startDateTime}
                        onChange={(e) => {
                            setStartDateTime(e.target.value)
                        }}
                        mb={4}
                    />
                    <Text>
                        End Date and Time
                    </Text>
                    <Input
                        type="datetime-local"
                        placeholder="End Date"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        mb={4}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={onSubmit}
                        isDisabled={disabled}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddReservationModal;
