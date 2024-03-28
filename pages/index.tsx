import { Box, Button, VStack, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import Layout from "@/components/layout";

const LandingPage = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default LandingPage;
