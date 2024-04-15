import React, { useState } from 'react';
import { Box, Heading, SimpleGrid, Image, Text, Button, Input, Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

//User data structure
interface User {
    name: string;
    bookings: string;
}

// Sample data for users
const users: User[] = [
    { name: 'Kevin', bookings: '1:00pm on the 28/03' },
    // Add more users if needed
];

// Find Kevin in the users array to set as the initial state
const kevin = users.find(user => user.name === 'Kevin');

const ProfilesPage = () => {
    const router = useRouter();
    // Set Kevin as the selected user by default
    const [selectedUser, setSelectedUser] = useState<User | null>(kevin ?? null);

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
                    {selectedUser ? selectedUser.name : 'No User Selected'}
                </Heading>
                <Box shadow="md" borderWidth="1px" bg="gray.50">
                    <Text fontWeight = "bold" fontSize="xl"> 
                        Bookings:<br />
                        <Text fontWeight="normal" fontStyle="italic">
                            {selectedUser ? selectedUser.bookings : 'None'}
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