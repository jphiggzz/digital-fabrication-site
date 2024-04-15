import React, { useState } from 'react';
import { Box, Button, VStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '@/firebase/firestore/index';
import { useAuth } from '../hooks/authcontext';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

{ /* This component should be able to update the printer db  */ }
{ /* addPrinter currently broken but it should work by Thurs  */ }

const ManagePrinters = () => {

    const { user, isAdmin } = useAuth();
    const router = useRouter();

    if (!user) {
        return <div>Loading or not authenticated...</div>; // This will only be shown briefly
    }

    useEffect(() => {
        if (!isAdmin) {
            router.push('/'); // Redirect to home if not admin
            return;
        }
    }, [isAdmin, router]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    console.log("handleSubmit called");
  
    const printer = {
      id: '27',
      name: name,
      description: description,
      numAvailable: 1
    };
  
    console.log("Preparing to add printer:", printer);
  
    try {
      console.log("Entering try block, about to call addDoc");
      const docRef = await addDoc(collection(db, "printers"), printer);
      console.log("addDoc function call completed");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Caught an error in addDoc: ", e);
    }
  
    console.log("Resetting form fields");
    setName('');
    setDescription('');
    onClose(); // Assuming onClose is defined somewhere
    console.log("Form fields reset and modal closed");
  };

  

  return (
    <Box p={8} maxW="container.md" mx="auto">
      <VStack spacing={4} align="flex-start">
        {/* ... other components ... */}
        <Button colorScheme="blue" size="lg" onClick={onOpen}>
          Add Printer
        </Button>
      </VStack>

      {/* Modal */}
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
