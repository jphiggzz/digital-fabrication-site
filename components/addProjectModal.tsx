import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Textarea, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAddPrint } from '../hooks/useAddProject'; // Ensure path is correct

const AddPrintModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { addPrint, isLoading } = useAddPrint();
  const toast = useToast();  // Define toast at the top level

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
      }
  };

  const handleSubmit = async () => {
      if (!file || !name || !description) {
          toast({  // Use toast from the top-level hook
              title: "Please fill in all fields.",
              status: "warning",
              duration: 5000,
              isClosable: true,
          });
          return;
      }
      await addPrint(file, name, description);
      onClose();
  };

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Add a new 3D print</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                  <FormControl>
                      <FormLabel>File</FormLabel>
                      <Input type="file" accept=".stl" onChange={handleFileChange} />
                  </FormControl>
                  <FormControl mt={4}>
                      <FormLabel>Name</FormLabel>
                      <Input placeholder="Name of the print" value={name} onChange={(e) => setName(e.target.value)} />
                  </FormControl>
                  <FormControl mt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </FormControl>
              </ModalBody>
              <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
                      Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
  );
};

export default AddPrintModal;
