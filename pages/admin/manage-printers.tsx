import React, { useState, useEffect } from 'react';
import { Box, Button, VStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '@/firebase/firestore/index';
import { useAuth } from '@/hooks/authcontext';
import { useRouter } from 'next/router';

const ManagePrinters = () => {
    const { user, isAdmin } = useAuth();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Handle user authentication and authorization
    useEffect(() => {
        if (!user) {
            router.push('/login'); // Redirect to login if not authenticated
        } else if (!isAdmin) {
            router.push('/'); // Redirect to home if not admin
        }
    }, [user, isAdmin, router]);

    const handleSubmit = async () => {
        console.log("Preparing to add printer:", { name, description });
        const printer = { id: '27', name, description, numAvailable: 1 };
  
        try {
            const docRef = await addDoc(collection(db, "printers"), printer);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Caught an error in addDoc: ", e);
        }
  
        setName('');
        setDescription('');
        onClose();
    };

    // Render loading state until user is verified
    if (!user || !isAdmin) {
        return <div>Loading or not authenticated...</div>;
    }

    return (
        <Box p={8} maxW="container.md" mx="auto">
            <VStack spacing={4} align="flex-start">
                <Button colorScheme="blue" size="lg" onClick={onOpen}>
                    Add Printer
                </Button>
            </VStack>

            {/* Modal for adding a new printer */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a New Printer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="printer-name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4} id="printer-description">
                            <FormLabel>Description</FormLabel>
                            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ManagePrinters;
