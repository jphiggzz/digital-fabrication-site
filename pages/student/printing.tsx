import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Image, Text, Button, Input, Flex } from '@chakra-ui/react';
import Navbar from '@/components/StudentHeader';
import Footer from '@/components/Footer';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db, storage } from '@/firebase/firestore/index';

// Printer data structure
interface Printer {
    name: string;
    description: string;
    url: string;
}

const PrintersPage = () => {
    const router = useRouter();
    const [selectedPrinter, setSelectedPrinter] = useState<Printer | null> (null) ;
    const [buttonClicked, setButtonClicked] = useState(false); // State to track button click
    const [printerImage, setPrinterImage] = useState<string>('');
    const initialPrinters: Printer[] = [
    ];
    const [printers, setPrinters] = useState(initialPrinters);
    const printersCollectionRef = collection(db, 'printers');




    useEffect(
        () => {
            // Get all printers
            const getEvents = async () => {
                try {
                    const data = await getDocs(printersCollectionRef);
                    const filteredData = data.docs.map((doc) => ({
                        ...doc.data(),
                        name: doc.data().name,
                        description: doc.data().description,
                        url: doc.data().url
                    })) as Printer[];
                    setPrinters(filteredData);
                    console.log(filteredData);
                } catch (err) {
                    console.error(err);
                }
            };
            getEvents();
        },
        []
    )

    const handleSelectPrinter = (printer: Printer) => {
        setSelectedPrinter(printer);
    };

    const handlePrintConfirmation = () => {
        router.push('/student/time-selection');
    };

    return (
        <Box height="100vh" display="flex" flexDirection="column" bg="gray.100">
            <Navbar />
            <Box p={8}>
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
                {selectedPrinter && (
                    <Button mt={4} colorScheme="teal" onClick={handlePrintConfirmation}>
                        View Times
                    </Button>
                )}
            </Box>
            <Footer />
        </Box>
    );
};

export default PrintersPage;