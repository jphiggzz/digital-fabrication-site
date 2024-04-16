import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Textarea, useToast
} from '@chakra-ui/react';
import useAddProject from "@/hooks/mutators/useAddProject"; // Ensure path is correct

const AddPrintModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    const {
        title,
        setTitle,
        description,
        setDescription,
        imageFile,
        setImageFile,
        printerFile,
        setPrinterFile,
        onSubmit,
        isLoading
    } = useAddProject();

  return (
      <Modal
          isOpen={isOpen}
          onClose={onClose}
      >
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Add a new 3D print</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                  <FormControl>
                      <FormLabel>Image</FormLabel>
                      <Input
                          type="file"
                          accept={"image/*"}
                          onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setImageFile(e.target.files[0]);
                                }
                          }}
                      />
                  </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>3D Print File</FormLabel>
                        <Input
                            type="file"
                            accept={".stl"}
                            onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setPrinterFile(e.target.files[0]);
                                    }
                            }}
                        />
                    </FormControl>
                  <FormControl mt={4}>
                      <FormLabel>Name</FormLabel>
                      <Input
                          placeholder="Title of the print"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                      />
                  </FormControl>
                  <FormControl mt={4}>
                      <FormLabel>
                          Description
                      </FormLabel>
                      <Textarea
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      />
                  </FormControl>
              </ModalBody>
              <ModalFooter>
                  <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={onSubmit}
                      isLoading={isLoading}
                      isDisabled={!title || !description || !imageFile || !printerFile}
                  >
                      Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
  );
};

export default AddPrintModal;
