import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text, Button, Flex } from '@chakra-ui/react';
import Navbar from '@/components/StudentHeader';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/authcontext';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firestore/index';
import { Event, formatDateToString } from '@/types/Event';

const initialEvents: Event[] = [];




const initialEvents: Event[] = [
    // Assuming starting with some events
    // Dates need to be adjusted or dynamically set
];


const ProfilesPage = () => {
    const { user } = useAuth();
    const userName = user?.displayName || 'No User';
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const router = useRouter();
    const eventsCollectionRef = collection(db, "reservations");

    useEffect(() => {
        const getEvents = async () => {
            const data = await getDocs(eventsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                printName: doc.data().id,
                user: doc.data().user,
                startTime: new Date(doc.data().startTime.seconds * 1000),
                endTime: new Date(doc.data().endTime.seconds * 1000),
                printer: doc.data().printer
            })).filter(event => event.user === userName);
            setEvents(filteredData);
        };
        getEvents();
    }, [userName]);

    const handleCancel = async (eventId: string) => {
        try {
            await deleteDoc(doc(db, "reservations", eventId));
            setEvents(prev => prev.filter(event => event.id !== eventId));
        } catch (err) {
            console.error('Error removing document: ', err);
        }
    };

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Flex flex="1" p="4" overflowY="auto" alignItems="start">
            <Box p={8}>
                <Heading as="h1" mb={4}>{userName}'s Bookings</Heading>
                <SimpleGrid columns={2} spacing={4}>
                    {events.map(event => (
                        <Box key={event.id} shadow="md" borderWidth="1px" bg="gray.50" p={4}>
                            <Text fontWeight="bold">{event.printName}</Text>
                            <Text>Printer: {event.printer}</Text>
                            <Text>Start: {formatDateToString(event.startTime)}</Text>
                            <Text>End: {formatDateToString(event.endTime)}</Text>
                            <Button colorScheme="red" mt="4" onClick={() => handleCancel(event.id)}>Cancel</Button>
                        </Box>
                    ))}
                    </SimpleGrid>
                    </Box>
                {events.length === 0 && <Text>No bookings found.</Text>}
                </Flex>
            <Footer />
        </Box>
    );
};

export default ProfilesPage;