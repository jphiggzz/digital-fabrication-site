import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text, Button, Flex } from '@chakra-ui/react';
import Navbar from '@/components/StudentHeader';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/authcontext';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firestore/index';
import { Event, formatDateToString } from '@/types/Event';

// Initialize events state with an empty array
const initialEvents: Event[] = [];

// ProfilesPage Component
const ProfilesPage = () => {
    // Get user and signOut from the useAuth hook
    const { user, signOut } = useAuth();
    // Store user's Name
    const userName = user?.displayName || 'User not Found';
    // Initialize events state
    const [events, setEvents] = useState<Event[]>(initialEvents);
    // Initialize router with useRouter hook
    const router = useRouter();
    // Initialize the eventsCollectionRef variable with the reservations collection reference
    const eventsCollectionRef = collection(db, "reservations");

    // Hook to fetch user's events
    useEffect(() => {
        const getEvents = async () => {
            // Fetch documents
            const data = await getDocs(eventsCollectionRef);
            // Map documents to an array of Event objects and filter by Name
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                printName: doc.data().id,
                user: doc.data().user,
                startTime: doc.data().startTime ? new Date(doc.data().startTime.seconds * 1000) : new Date(),
                endTime: doc.data().endTime ? new Date(doc.data().endTime.seconds * 1000) : new Date(),
                printer: doc.data().printer
            })).filter(event => event.user === userName);
            // Set the events state
            setEvents(filteredData);
        };
        // Call the getEvents function
        getEvents();
    }, [userName]);

    // Async function to handle reservation cancellation
    const handleCancel = async (eventId: string) => {
        try {
            // Delete the document with the given eventId
            await deleteDoc(doc(db, "reservations", eventId));
            // Notify user about successful cancellation
            alert("Reservation cancelled successfully!");
            // Filter the events state to remove the cancelled event
            setEvents(prev => prev.filter(event => event.id !== eventId));
        } catch (err) {
            // Log error message if something went wrong
            console.error('Error removing document: ', err);
        }
    };

    // Async function to logout the user
    const handleLogout = async () => {
        await signOut(); // Call signOut function
        router.push('/'); // Redirect user to homepage after logging out
    };
    
    // Render the page
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
                    {events.length === 0 && <Text>No bookings found.</Text>}
                    <Button colorScheme="blue" onClick={handleLogout} marginTop={5} >Logout</Button>
                </Box>
            </Flex>
            <Footer />
        </Box>
    );
};

export default ProfilesPage;