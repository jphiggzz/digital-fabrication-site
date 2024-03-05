import React, { useEffect, useState } from 'react';
import { Button, Text, VStack, Flex, SimpleGrid, useToast } from '@chakra-ui/react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import db from '@/firebase/firestore/index';
import { PrinterType, TimeSlot, ReservedSlot } from '@/types/firestore-types';

const printerTypes: PrinterType[] = ['filament', 'powder', 'plastic'];

const TestDB = () => {
    const [selectedPrinter, setSelectedPrinter] = useState<PrinterType | null>(null);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
    const [reservedSlots, setReservedSlots] = useState<ReservedSlot[]>([]);
    const toast = useToast();

    useEffect(() => {
        console.log("Fetching data...");
        fetchData();
    }, []);
    

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'timeslots'));
            const slots: ReservedSlot[] = querySnapshot.docs.map(doc => {
                const docData = doc.data() as ReservedSlot;
                return { ...docData, id: doc.id };
            });
            setReservedSlots(slots);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch data from Firestore',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handlePrinterSelect = (printer: PrinterType) => {
        setSelectedPrinter(printer);
        setSelectedTimeSlots([]); // Reset time slots on printer change
    };

    const handleTimeSlotSelect = (slot: TimeSlot) => {
        setSelectedTimeSlots(prev => [...prev, slot]);
    };

    const handleReserve = async () => {
        if (!selectedPrinter) {
            toast({
                title: 'Error',
                description: 'Printer not selected',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        try {
            const batch = [];
            for (const slot of selectedTimeSlots) {
                const newSlot = {
                    ...slot,
                    printerId: selectedPrinter,
                    reserved: true,
                    studentEmail: 'example@student.com',
                };
                batch.push(addDoc(collection(db, 'timeslots'), newSlot));
            }
            await Promise.all(batch);
            fetchData();
            setSelectedTimeSlots([]);
        } catch (error) {
            console.error('Error reserving slots:', error);
            toast({
                title: 'Error',
                description: 'Failed to reserve slots',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <VStack spacing={6} p={5}>
            <SimpleGrid columns={3} spacing={10}>
                {printerTypes.map(printer => (
                    <Button key={printer} colorScheme="teal" variant="outline" onClick={() => handlePrinterSelect(printer)}>
                        {printer.toUpperCase()}
                    </Button>
                ))}
            </SimpleGrid>
            {selectedPrinter && (
                <>
                    <Text>Select Time Slots for {selectedPrinter.toUpperCase()}</Text>
                    <SimpleGrid columns={4} spacing={5}>
                        {reservedSlots.map((slot, index) => (
                            <Button
                                key={index}
                                colorScheme={selectedTimeSlots.some(selectedSlot => selectedSlot.label === slot.label) ? "green" : "blue"}
                                variant="outline"
                                onClick={() => handleTimeSlotSelect(slot)}
                            >
                                {slot.label}
                            </Button>
                        ))}
                    </SimpleGrid>
                    <Button colorScheme="green" onClick={handleReserve}>Reserve Selected Slots</Button>
                </>
            )}
            <Flex direction="column" align="start" w="full">
                <Text fontSize="lg" fontWeight="bold">Database Contents:</Text>
                {reservedSlots.map(slot => (
                    <Text key={slot.id} fontSize="md">
                        {slot.label} - {slot.printerId} - Reserved by: {slot.studentEmail}
                    </Text>
                ))}
            </Flex>
        </VStack>
    );
};

export default TestDB;
