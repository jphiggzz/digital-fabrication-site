import React, { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import {
    Box, Button, Flex, Heading, Input, Text, VStack, IconButton, Stack, Image, FormControl, FormLabel, Select
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { format, parseISO, isWithinInterval, addDays, subDays, differenceInCalendarDays, isBefore, isToday } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Event, formatDateToString } from '@/types/Event';
import { Printer } from '@/types/Printer';
import { addEvent, getEvents } from '../services/events';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firestore/index';


const printers: Printer[] = [
    // Add the correct path to your images or use URLs
    { id: '1', name: 'Voron', imageUrl: '/images/Voron.jpg', description: 'Available' },
    { id: '2', name: 'MakerGear M3', imageUrl: '/images/MakerGearM3.jpg', description: 'In Use' },
    { id: '3', name: 'Form 3', imageUrl: '/images/Form3.jpg', description: 'Available' },
];

const initialEvents: Event[] = [
    // Assuming starting with some events
    // Dates need to be adjusted or dynamically set
];

const TimeSelection = () => {
    const { data: session } = useSession();
    const [events, setEvents] = useState(initialEvents);
    const eventsCollectionRef = collection(db, "reservations");

    //const convertToTimestamp = (timestamp: Timestamp) => {
      //  if (!timestamp) return null; // or a default value
        //return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    //};

    useEffect(
        () => {
            // Get all reservations
            const getEvents = async () => {
                try {
                    const data = await getDocs(eventsCollectionRef);
                    const filteredData = data.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        startTime: doc.data().startTime,
                        endTime: doc.data().endTime
                    })) as Event[]; 
                    setEvents(filteredData);
                    console.log(filteredData);
                } catch (err) {
                    console.error(err);
                }
            };
            getEvents();
        },
        []
    )


    const [selectedDay, setSelectedDay] = useState(new Date());
    const [newEventDetails, setNewEventDetails] = useState({ ID: '', startTime: '', endTime: ''});
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

    const addNewEvent = async () => {
        const { ID, startTime, endTime } = newEventDetails;
        const id = ID;
        const startDateTime = parseISO(startTime);
        const endDateTime = parseISO(endTime);

         //check for time conflicts
        // Check if startDateTime is before endDateTime
        if (!isBefore(startDateTime, endDateTime)) {
            alert("Start time must be before end time.");
            return;
        }

        // Ensure both start and end times are not in the past
        if (isBefore(startDateTime, new Date()) || isBefore(endDateTime, new Date())) {
            alert("Event times must be in the future.");
            return;
        }

        // Check for time conflicts with existing events
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
            startTime: startDateTime, // Change the type to string
            endTime: endDateTime, // Change the type to string
            user: session?.user?.email || 'no user',
            printer: printers[0].name
        };

        await addEvent(newEvent);

        setEvents([...events, newEvent]);
        setNewEventDetails({ ID: '', startTime: '', endTime: ''});
    };

    const renderEvent = (event: Event) => {
        return (
            <Box key={event.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} my={2}>
                <Text>{event.id} </Text>
                <Text>Start: {event.startTime.toString()} </Text>
                <Text>End: {event.endTime.toString()} </Text>
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
                    {events.map(event => renderEvent(event))}
                </VStack>
                <Flex flex="1" flexDirection="column" ml="4">
                    <Heading size="md">Add New Event</Heading>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input value={newEventDetails.ID} onChange={(e) => setNewEventDetails({ ...newEventDetails, ID: e.target.value })} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Start Time</FormLabel>
                        <Input type="datetime-local" value={newEventDetails.startTime} onChange={(e) => setNewEventDetails({ ...newEventDetails, startTime: e.target.value })} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>End Time</FormLabel>
                        <Input type="datetime-local" value={newEventDetails.endTime} onChange={(e) => setNewEventDetails({ ...newEventDetails, endTime: e.target.value })} />
                    </FormControl>
                    <Button mt="4" colorScheme="blue" onClick={addNewEvent}>Add Event</Button>
                </Flex>
            </Flex>
            <Footer />
        </Box>
    );
};

export default TimeSelection;