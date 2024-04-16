import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input
} from '@chakra-ui/react';

// Type definitions for props expected by the component
interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  addAdmin: (admin: { email: string; name: string }) => void;
}

// AddAdminModal Component
const AddAdminModal: React.FC<AddAdminModalProps> = ({ isOpen, onClose, addAdmin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Function to handle form submission
  const handleAdd = () => {
    addAdmin({ email, name });
    onClose(); // Close the modal after adding
  };

  // Render the page
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Admin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAdd}>
            Add Admin
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAdminModal;
