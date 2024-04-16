import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Heading, SimpleGrid, Text, Button, Flex } from '@chakra-ui/react';
import Navbar from '@/components/AdminHeader';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firestore/index';
import { Event } from '@/types/Event';

const initialEvents: Event[] = [];

const AdminReservationPage = () => {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const router = useRouter();
    const eventsCollectionRef = collection(db, "reservations");

    // Helper function to format dates for display in the heading
    const formattedDate = (date : Date) => {
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Helper function to format event times
    const formatEventTime = (date : Date) => {
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getDocs(eventsCollectionRef);
            const allEvents = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                printName: doc.data().id || 'Unknown',
                user: doc.data().user,
                startTime: new Date(doc.data().startTime.seconds * 1000),
                endTime: new Date(doc.data().endTime.seconds * 1000),
                printer: doc.data().printer
            }));

            if (selectedDate) {
                const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
                const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
                const filteredEvents = allEvents.filter(event => {
                    const eventDate = new Date(event.startTime);
                    return eventDate >= startOfDay && eventDate <= endOfDay;
                });
                setEvents(filteredEvents);
            } else {
                setEvents(allEvents); 
            }
        };
        fetchEvents();
    }, [selectedDate]);

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
                    <Heading as="h1" mb={4}>
                        All Bookings for {formattedDate(selectedDate)}
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => {
                                if (date) setSelectedDate(new Date(date)); // Ensure that the date is a Date object
                            }}
                            dateFormat="MMMM d, yyyy"
                            customInput={<Button ml={4}>Select Date</Button>}
                        />
                    </Heading>
                    <SimpleGrid columns={2} spacing={4}>
                        {events.map(event => (
                            <Box key={event.id} shadow="md" borderWidth="1px" bg="gray.50" p={4}>
                                <Text fontWeight="bold">{event.printName}</Text>
                                <Text>Booked by: {event.user}</Text>
                                <Text>Printer: {event.printer}</Text>
                                <Text>Start: {formatEventTime(event.startTime)}</Text>
                                <Text>End: {formatEventTime(event.endTime)}</Text>
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

export default AdminReservationPage;
