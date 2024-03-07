import React, { useState } from 'react';
import { Box, Heading, SimpleGrid, Image, Text, Button, Input, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import AdminHeader from '@/components/AdminHeader'; // Assuming AdminHeader exists
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { Form3, MakerGearM3, Voron } from '@/assets/printer-photos';

// Printer data structure
interface Printer {
    id: number;
    name: string;
    imageUrl: string;
    status: string;
}

// Sample data for printers
const printers: Printer[] = [
    { id: 1, name: 'Voron', imageUrl: Voron.src, status: 'Available' },
    { id: 2, name: 'MakerGear M3', imageUrl: MakerGearM3.src, status: 'In Use' },
    { id: 3, name: 'Form 3', imageUrl: Form3.src, status: 'Available' },
];

const PrintersPage = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
    const [printDuration, setPrintDuration] = useState({ hours: 0, minutes: 0 });
    const [newPrinterInfo, setNewPrinterInfo] = useState({ name: '', description: '', image: null });

    const handleSelectPrinter = (printer: Printer) => {
        setSelectedPrinter(printer);
    };

    const handlePrintConfirmation = () => {
        router.push('/time-selection');
    };

    const handleAddPrinter = () => {
        onOpen();
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
        // You can handle the file upload here
        console.log('Uploaded file:', file);
        // For simplicity, let's just store the file object in state
        setNewPrinterInfo({ ...newPrinterInfo});
      } else {
        setNewPrinterInfo({ ...newPrinterInfo});
      }
    };

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
                            <Image src={printer.imageUrl} alt={printer.name} />
                            <Heading fontSize="xl">{printer.name}</Heading>
                            <Text>Status: {printer.status}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
                <Button mt={4} colorScheme="blue" onClick={handleAddPrinter}>
                    Add Printer
                </Button>
                {selectedPrinter && (
                    <Box mt={8}>
                        <Heading as="h2" mb={4}>
                            Enter Print Duration
                        </Heading>
                        <Flex>
                            <Input
                                type="number"
                                placeholder="Hours"
                                value={printDuration.hours}
                                onChange={(e) =>
                                    setPrintDuration({ ...printDuration, hours: parseInt(e.target.value) })
                                }
                                size="md"
                                width="100px"
                            />
                            <Box mx={2}>:</Box>
                            <Input
                                type="number"
                                placeholder="Minutes"
                                value={printDuration.minutes}
                                onChange={(e) =>
                                    setPrintDuration({ ...printDuration, minutes: parseInt(e.target.value) })
                                }
                                size="md"
                                width="100px"
                            />
                        </Flex>
                    </Box>
                )}
                {selectedPrinter && printDuration.hours > 0 && printDuration.minutes > 0 && (
                    <Button mt={4} colorScheme="blue" onClick={handlePrintConfirmation}>
                        Confirm Print
                    </Button>
                )}
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
                        <Button colorScheme="blue" mr={3}>
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
