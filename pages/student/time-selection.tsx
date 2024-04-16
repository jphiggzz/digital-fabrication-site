import React, { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import {
    Box, Button, Flex, Heading, Input, Text, VStack, IconButton, Stack, Image, FormControl, FormLabel, Select
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { format, parseISO, isWithinInterval, addDays, subDays, differenceInCalendarDays, isBefore, isSameDay } from 'date-fns';
import { useRouter } from 'next/router';
import Navbar from '@/components/StudentHeader';
import Footer from '@/components/Footer';
import { Event, formatDateToString } from '@/types/Event';
import { Printer } from '@/types/Printer';
import { addEvent } from '../../services/events';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firestore/index';
import { useAuth } from '../../hooks/authcontext';
import { useMemo } from 'react';

const initialEvents: Event[] = [];

const TimeSelection = () => {
    const router = useRouter();
    const { user } = useAuth();
    const userName = user?.displayName || 'no user'; 
    const [events, setEvents] = useState(initialEvents);
    const [selectedDay, setSelectedDay] = useState(new Date());
    const eventsCollectionRef = useMemo(() => collection(db, "reservations"), [db]);

    const printerName = router.query.selectedPrinter;
    const printerNameString = Array.isArray(printerName) ? printerName[0] : printerName || 'defaultPrinterName';
    const [newEventDetails, setNewEventDetails] = useState({ ID: '', user: '', startTime: new Date(), endTime: new Date(), printer: '' });
    const today = new Date();
    const maxDay = addDays(today, 7);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await getDocs(eventsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.data().id,
                    user: doc.data().user,
                    startTime: new Date(doc.data().startTime.seconds * 1000), // Convert Timestamp to Date
                    endTime: new Date(doc.data().endTime.seconds * 1000),
                    printer: doc.data().printer
                })).filter(event => event.printer === printerNameString && isSameDay(event.startTime, selectedDay)
                ) as Event[];
                setEvents(filteredData);
            } catch (err) {
                console.error(err);
            }
        };
        if (printerName) {
            getEvents();
        }
    }, [printerName, selectedDay, eventsCollectionRef]);

    const handleDayChange = (direction: 'next' | 'prev') => {
        setSelectedDay(prev => {
            const newDay = direction === 'next' ? addDays(prev, 1) : subDays(prev, 1);
            if (direction === 'next' && differenceInCalendarDays(newDay, today) > 7) return prev;
            if (direction === 'prev' && isBefore(newDay, today)) return today;
    
            // Update startDateTime to the new selected day
            const startDateTime = new Date(newDay);
            startDateTime.setHours(0, 0, 0, 0);
    
            // Calculate endDateTime as two hours after startDateTime
            const endDateTime = new Date(startDateTime);
            endDateTime.setHours(startDateTime.getHours() + 2);
    
            setNewEventDetails(prev => ({
                ...prev,
                startTime: startDateTime,
                endTime: endDateTime
            }));
    
            return newDay;
        });
    };

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (!inputValue) return; // Check if input value is empty
        const localTime = new Date(inputValue);
        const timeInUtc = new Date(Date.UTC(localTime.getFullYear(), localTime.getMonth(), localTime.getDate(), localTime.getHours(), localTime.getMinutes()));
        setNewEventDetails(prev => ({
            ...prev,
            startTime: timeInUtc
        }));
    };
    
    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (!inputValue) return; // Check if input value is empty
        const localTime = new Date(inputValue);
        const timeInUtc = new Date(Date.UTC(localTime.getFullYear(), localTime.getMonth(), localTime.getDate(), localTime.getHours(), localTime.getMinutes()));
        setNewEventDetails(prev => ({
            ...prev,
            endTime: timeInUtc
        }));
    };
    

    const addNewEvent = async () => {
        const { ID, startTime, endTime } = newEventDetails;
        const id = ID;
        const startDateTime = startTime;
        const endDateTime = endTime;

        if (!isBefore(startDateTime, endDateTime)) {
            alert("Start time must be before end time.");
            return;
        }

        if (isBefore(startDateTime, new Date()) || isBefore(endDateTime, new Date())) {
            alert("Event times must be in the future.");
            return;
        }

        if (!isBefore(startDateTime, addDays(new Date(), 7)) || !isBefore(endDateTime, addDays(new Date(), 7))) {
            alert("Can only book 7 days in advance.");
            return;
        }

        const hasConflict = events.some(event => {
            const eventStart = new Date(event.startTime);
            const eventEnd = new Date(event.endTime);
            return (
                isWithinInterval(startDateTime, { start: eventStart, end: eventEnd }) ||
                isWithinInterval(endDateTime, { start: eventStart, end: eventEnd }) ||
                isWithinInterval(eventStart, { start: startDateTime, end: endDateTime }) ||
                isWithinInterval(eventEnd, { start: startDateTime, end: endDateTime })
            );
        });

        if (hasConflict) {
            alert("Event time overlaps with an existing event.");
            return;
        }

        const newEvent: Event = {
            id: ID,
            user: userName,
            startTime: startDateTime,
            endTime: endDateTime,
            printer: printerNameString,
            printName: printerNameString
        };

        await addEvent(newEvent);
        setEvents([...events, newEvent]);
        setNewEventDetails({ ID: '', user: '', startTime: new Date(), endTime: new Date(), printer: '' });
    };

    const formatDateToString = (date : Date) => {
        return format(date, 'MMMM dd, yyyy, h:mm a'); // Example: April 16, 2024, 3:00 PM
    };

    const renderEvent = (event : Event) => {
        return (
            <Box key={event.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} my={2}>
            <Text fontWeight="bold">{event.id}</Text>
                <Text>Start: {formatDateToString(new Date(event.startTime))}</Text>
                <Text>End: {formatDateToString(new Date(event.endTime))}</Text>
                <Text>User: {event.user}</Text>
                <Text>Printer: {event.printer}</Text>
            </Box>
        );
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
                    {events.map(renderEvent)}
                </VStack>
                <Flex flex="1" flexDirection="column" ml="4">
                    <Heading size="md">Add New Event</Heading>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input value={newEventDetails.ID} onChange={(e) => setNewEventDetails({ ...newEventDetails, ID: e.target.value })} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Start Time</FormLabel>
                        <Input type="datetime-local" value={newEventDetails.startTime.toISOString().slice(0, 16)} onChange={handleStartTimeChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>End Time</FormLabel>
                        <Input type="datetime-local" value={newEventDetails.endTime.toISOString().slice(0, 16)} onChange={handleEndTimeChange} />
                    </FormControl>
                    <Button mt="4" colorScheme="blue" onClick={addNewEvent}>Add Event</Button>
                </Flex>
            </Flex>
            <Footer />
        </Box>
    );
};

export default TimeSelection;
