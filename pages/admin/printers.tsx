import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Image, Text, Button, Input, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import AdminHeader from '@/components/AdminHeader'; // Assuming AdminHeader exists
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, storage } from '@/firebase/firestore/index';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

// Printer data structure
interface Printer {
    name: string;
    description: string;
    url: string;
}

const PrintersPage = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
    const [newPrinterInfo, setNewPrinterInfo] = useState({ name: '', description: '', url: '' });
    const [printerImage, setPrinterImage] = useState<string>('');
    const initialPrinters: Printer[] = [
    ];
    const [printers, setPrinters] = useState(initialPrinters);
    const printersCollectionRef = collection(db, 'printers');

    useEffect(() => {
        const fetchPrinters = async () => {
            try {
                const data = await getDocs(printersCollectionRef);
                const printersData = data.docs.map(doc => ({
                    name: doc.data().name,
                    description: doc.data().description,
                    url: doc.data().url
                })) as Printer[];
                setPrinters(printersData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPrinters();
    }, [printersCollectionRef]);  // Include printersCollectionRef in the dependency array

    const handleSelectPrinter = (printer: Printer) => {
        setSelectedPrinter(printer);
    };

    const handleAddPrinter = async () => {
        try {
            console.log('Before adding printer');
          // Reference to the "printers" collection in Firestore
          const collectionRef = collection(db, 'printers');
            console.log('After adding printer');
          // Create a new printer object with the form data
          const newPrinter = {
            name: newPrinterInfo.name,
              description: newPrinterInfo.description,
              url: newPrinterInfo.url

            // Add other relevant fields for the printer
          };
          try   {
              const docRef = await addDoc(collectionRef, newPrinter);

            } catch (error) {   
            console.error('Error adding printer: ', error);
            }
          // Write the new printer to Firestore
          console.log('New printer added with ID: ');
    
          // Clear the form fields after successful submission
          setNewPrinterInfo({ name: '', description: '', url: '' });
    
          // Close the modal
          onClose();
        } catch (error) {
          console.error('Error adding printer: ', error);
        }
      };
    

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrinterInfo({ ...newPrinterInfo, name: e.target.value });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPrinterInfo({ ...newPrinterInfo, description: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const uniqueFileName = file.name + '-' + v4(); 
            const imageRef = ref(storage, `images/${uniqueFileName}`);

            // Upload the file first
            uploadBytes(imageRef, file).then((snapshot) => {
                // After successful upload, get the download URL
                return getDownloadURL(snapshot.ref);
            }).then((printerUrl) => {
                setNewPrinterInfo({ ...newPrinterInfo, url: printerUrl });
            }).catch((error) => {
                console.error("Error with file upload or fetching URL:", error);
            });
        } else {
            // Handle the case where no file is selected, set default or placeholder URL
            setNewPrinterInfo({ ...newPrinterInfo, url: '/assets/printer-photos/Form3.png' });
        }
    };

    useEffect(() => {
        return () => {
            if (printerImage) {
                URL.revokeObjectURL(printerImage);
            }
        };
    }, [printerImage]);

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" bg="gray.100">
            <AdminHeader />
            <Box p={8} flex="1">
                <Heading as="h1" mb={4}>
                    Select a printer:
                </Heading>
                <SimpleGrid columns={3} spacing={10}>
                    {printers.map((printer, index) => (
                        <Box key={index} p={5} shadow="md" borderWidth="1px" bg="gray.50">
                            <Image src={printer.url} alt={printer.name} />
                            <Heading fontSize="xl">{printer.name}</Heading>
                            <Button
                                mt={4}
                                onClick={() => handleSelectPrinter(printer)}
                                colorScheme={selectedPrinter === printer ? 'green' : 'blue'}
                            >
                                Select
                            </Button>
                        </Box>
                    ))}
                </SimpleGrid>
                <Button mt={4} colorScheme="blue" onClick={onOpen}>
                    Add Printer
                </Button>
            </Box>
            <Footer />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Printer</ModalHeader>
                    <ModalBody>
                        {/* Form for adding a new printer */}
                        <Input
                            placeholder="Name"
                            value={newPrinterInfo.name}
                            onChange={handleNameChange}
                            mb={4}
                        />
                        <Input
                            placeholder="Description"
                            value={newPrinterInfo.description}
                            onChange={handleDescriptionChange}
                            mb={4}
                        />
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            mb={4}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button  onClick={handleAddPrinter} colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default PrintersPage;
