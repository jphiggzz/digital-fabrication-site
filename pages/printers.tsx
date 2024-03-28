import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Heading, SimpleGrid, Image, Text, Button, Input, Flex } from '@chakra-ui/react';

import { Form3, MakerGearM3, Voron } from '@/assets/printer-photos';
import Layout from "@/components/layout";


//printer data structure
interface Printer {
    name : string;
    imageUrl: string;
    status: string;
}

// sample data for printers
const printers : Printer[] = [
    { name: 'Voron', imageUrl: Voron.src, status: 'Available' },
    { name: 'MakerGear M3', imageUrl: MakerGearM3.src, status: 'In Use' },
    { name: 'Form 3', imageUrl: Form3.src, status: 'Available' },
];

const PrintersPage = () => {
    const router = useRouter();
    const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
    const [printDuration, setPrintDuration] = useState({ hours: 0, minutes: 0 });
    const [buttonClicked, setButtonClicked] = useState(false); // State to track button click

    const handleSelectPrinter = (printer: Printer) => {
        setSelectedPrinter(printer);
    };

    const handlePrintConfirmation = () => {
        router.push('/time-selection');
    };

    return (
        <Layout>
            <Box p={8}>
                <Heading as="h1" mb={4}>
                    Select a printer:
                </Heading>
                <SimpleGrid columns={3} spacing={10}>
                    {printers.map((printer, index) => (
                        <Box key={index} p={5} shadow="md" borderWidth="1px" bg="gray.50">
                            <Image src={printer.imageUrl} alt={printer.name} />
                            <Heading fontSize="xl">{printer.name}</Heading>
                            <Text mt={4}>Status: {printer.status}</Text>
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
                                width = "100px"
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
        </Layout>
    );
};

export default PrintersPage;