import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Image, Text, Button, Input, Flex } from '@chakra-ui/react';
import Navbar from '@/components/StudentHeader';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/authcontext';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firestore/index';
import { Event } from '@/types/Event';
import { isWithinInterval, addDays} from 'date-fns';


const initialEvents: Event[] = [
    // Assuming starting with some events
    // Dates need to be adjusted or dynamically set
];

const ProfilesPage = () => {
    const { user } = useAuth();
    const userName = user?.displayName || 'no user';
    const [events, setEvents] = useState(initialEvents);
    const router = useRouter();
    const eventsCollectionRef = collection(db, "reservations");

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await getDocs(eventsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    user: doc.data().user,
                    startTime: new Date(doc.data().startTime.seconds * 1000),
                    endTime: new Date(doc.data().endTime.seconds * 1000),
                    printer: doc.data().printer
                })).filter(Event => Event.user === userName && isWithinInterval(Event.startTime, { start: new Date(), end: addDays(new Date(), 7) }));
                setEvents(filteredData);
                console.log(filteredData);
            } catch (err) {
                console.error(err);
            }
        };
        getEvents();
    }, [userName, eventsCollectionRef]);  // Include eventsCollectionRef in the dependency array
    


    // Function to handle the "Cancel" action
    const handleCancel = () => {
        // Example: Navigate back to the previous page
        router.back();
        // Or you can navigate to a specific path: router.push('/somePath');
        // Or clear the selection: setSelectedUser(null);
    };

    return (
        <Box height="100vh" display="flex" flexDirection="column" bg="gray.100">
            <Navbar />
            <Box p={8}>
                <Heading as="h1" mb={4}>
                    {userName}
                </Heading>
                <Box shadow="md" borderWidth="1px" bg="gray.50">
                    <Text fontWeight = "bold" fontSize="xl"> 
                        Bookings:<br />
                        <Text fontWeight="normal" fontStyle="italic">
                            
                        </Text>
                    </Text>
                    <Button colorScheme="red" mt="4" onClick={handleCancel}>Cancel</Button>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default ProfilesPage;