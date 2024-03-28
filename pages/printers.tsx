import React, { useState } from 'react';

import { useRouter } from 'next/router';

import {Box, Heading, SimpleGrid, Image, Text, Button, Input, Flex, useDisclosure} from '@chakra-ui/react';

import { Form3, MakerGearM3, Voron } from '@/assets/printer-photos';
import Layout from "@/components/layout";
import AddReservationModal from "@/components/reservations/AddReservationModal";
import {Printer} from "@/types/Printer";
import usePrinters from "@/hooks/queries/usePrinters";
import UserReservations from "@/components/reservations/UserReservations";


const PrintersPage = () => {
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { printers } = usePrinters();

    const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);

    const handleSelectPrinter = (printer: Printer) => {
        setSelectedPrinter(printer);
        onOpen();
    };

    return (
        <Layout>
            <Box p={8}>
                <Heading as="h1" mb={4}>
                    Select a printer:
                </Heading>
                <SimpleGrid
                    columns={3}
                    spacing={10}
                    mb={8}
                >
                    {printers.map((printer, index) => (
                        <Box key={index} p={5} shadow="md" borderWidth="1px" bg="gray.50">
                            <Image src={printer.imageUrl} alt={printer.name} />
                            <Heading fontSize="xl">{printer.name}</Heading>
                            <Text mt={4}>{printer.description}</Text>
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
                <UserReservations />
                {selectedPrinter && (
                    <AddReservationModal
                        isOpen={isOpen}
                        onClose={onClose}
                        printer={selectedPrinter}
                    />
                )}
            </Box>
        </Layout>
    );
};

export default PrintersPage;