import { Box, Button, VStack, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

const LandingPage = () => {
  return (
    <Box p={8} maxW="container.md" mx="auto" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
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
          onClick={() => signIn('google', { callbackUrl: '/student-landing' })}
        >
          Sign in as Student
        </Button>
        {/* Admin Sign-in Button */}
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => signIn('google', { callbackUrl: '/admin-landing' })}
        >
          Sign in as Admin
        </Button>
      </VStack>
    </Box>
  );
};

export default LandingPage;
