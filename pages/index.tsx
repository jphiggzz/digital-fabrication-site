import { useRouter } from "next/router";
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/authcontext'; // Import useAuth hook

const LandingPage = () => {
    const router = useRouter(); // Get the router object
    const { signIn } = useAuth(); // Get signIn method from AuthContext

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
                    onClick={() => signIn(false, router)} // Use signIn from AuthContext
                >
                    Sign in as Student
                </Button>
                {/* Admin Sign-in Button */}
                <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => signIn(true, router)} // Use signIn from AuthContext
                >
                    Sign in as Admin
                </Button>
            </VStack>
        </Box>
    );
};

export default LandingPage;