import { useRouter } from "next/router";
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import googleSignIn from '../hooks/authFunctions';

const LandingPage = () => {
    const router = useRouter(); // Get the router object

    return (
        <Box p={8} maxW="container.md" mx="auto" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {/* Navbar */}
            <Navbar />

            <VStack spacing={4} align="center">
                <Text fontSize="5xl" fontWeight="bold" textAlign="center">
                    Digital Fabrication Lab Reservation System
                </Text>
                <Text fontSize="md" textAlign="center">
                    Click below to sign into Google
                </Text>
                {/* Student Sign-in Button */}
                <Button
                    colorScheme="blue"
                    size="lg"
                    onClick={() => googleSignIn(false, router)} // Pass router object
                >
                    Sign in as Student
                </Button>
                {/* Admin Sign-in Button */}
                <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => googleSignIn(true, router)} // Pass router object
                >
                    Sign in as Admin
                </Button>
            </VStack>
        </Box>
    );
};

export default LandingPage;