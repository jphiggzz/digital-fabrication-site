import React, { useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import {
    Box, Button, Flex, Heading, Input, Text, VStack, IconButton, Stack, Image, FormControl, FormLabel, Select
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { format, parseISO, isWithinInterval, addDays, subDays, differenceInCalendarDays } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GetServerSidePropsContext } from 'next';

interface Printer {
    name: string;
    imageUrl: string;
    status: string;
}

interface Event {
    id: number;
    user: string;
    startTime: Date;
    endTime: Date;
    printer: Printer;
    description: string;
}

const printers: Printer[] = [
    // Add the correct path to your images or use URLs
    { name: 'Voron', imageUrl: '/images/Voron.jpg', status: 'Available' },
    { name: 'MakerGear M3', imageUrl: '/images/MakerGearM3.jpg', status: 'In Use' },
    { name: 'Form 3', imageUrl: '/images/Form3.jpg', status: 'Available' },
];

const initialEvents: Event[] = [
    // Assuming starting with some events
    // Dates need to be adjusted or dynamically set
];

const TimeSelection = () => {
    const { data: session } = useSession();
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [newEventDetails, setNewEventDetails] = useState({ description: '', startTime: '', endTime: '', printerName: printers[0].name });
    const today = new Date();
    const maxDay = addDays(today, 7); // Limit up to 7 days from today

    const handleDayChange = (direction: 'next' | 'prev') => {
        setSelectedDay(prev => {
            const newDay = direction === 'next' ? addDays(prev, 1) : subDays(prev, 1);
            if (direction === 'next' && differenceInCalendarDays(newDay, today) > 7) return prev; // Prevent going beyond 7 days
            if (direction === 'prev' && newDay < today) return prev; // Prevent going before today
            return newDay;
        });
    };

    const addNewEvent = () => {
        const { description, startTime, endTime, printerName } = newEventDetails;
        const startDateTime = parseISO(startTime);
        const endDateTime = parseISO(endTime);
        const printer = printers.find(p => p.name === printerName);

        if (!printer) return; // Handle error appropriately

        // Example check for time conflicts
        const hasConflict = events.some(event =>
            isWithinInterval(startDateTime, { start: event.startTime, end: event.endTime }) ||
            isWithinInterval(endDateTime, { start: event.startTime, end: event.endTime })
        );

        if (hasConflict) {
            alert("Event time overlaps with an existing event.");
            return;
        }

        const newEvent: Event = {
            id: events.length + 1, // Simplistic approach for example
            user: session?.user?.name || 'Anonymous',
            startTime: startDateTime,
            endTime: endDateTime,
            printer: printer,
            description: description
        };

        setEvents([...events, newEvent]);
        setNewEventDetails({ description: '', startTime: '', endTime: '', printerName: printers[0].name });
    };

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Flex flex="1" p="4" overflowY="auto" alignItems="start">
                <VStack flex="1" spacing="4" alignItems="stretch">
                    <Heading size="md" textAlign="center">Events on {format(selectedDay, 'PPP')}</Heading>
                    <Stack direction="row" justifyContent="center" mb={4}>
                        <IconButton aria-label="Previous day" icon={<ArrowBackIcon />} onClick={() => handleDayChange('prev')} isDisabled={selectedDay <= today} />
                        <IconButton aria-label="Next day" icon={<ArrowForwardIcon />} onClick={() => handleDayChange('next')} isDisabled={differenceInCalendarDays(maxDay, selectedDay) <= 0} />
                    </Stack>
                    {/* Events list */}
                </VStack>
                <Flex flex="1" flexDirection="column" ml="4">
                    <Heading size="md">Add New Event</Heading>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input value={newEventDetails.description} onChange={(e) => setNewEventDetails({ ...newEventDetails, description: e.target.value })} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Start Time</FormLabel>
                        <Input type="datetime-local" value={newEventDetails.startTime} onChange={(e) => setNewEventDetails({ ...newEventDetails, startTime: e.target.value })} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>End Time</FormLabel>
                        <Input type="datetime-local" value={newEventDetails.endTime} onChange={(e) => setNewEventDetails({ ...newEventDetails, endTime: e.target.value })} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Printer</FormLabel>
                        <Select onChange={(e) => setNewEventDetails({ ...newEventDetails, printerName: e.target.value })} placeholder="Select printer">
                            {printers.map((printer, index) => (
                                <option key={index} value={printer.name}>{printer.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <Button mt="4" colorScheme="blue" onClick={addNewEvent}>Add Event</Button>
                </Flex>
            </Flex>
            <Footer />
        </Box>
    );
};

export default TimeSelection;