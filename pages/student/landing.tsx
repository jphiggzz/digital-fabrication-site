'use client'
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import Navbar from '@/components/StudentHeader';
import Footer from '@/components/Footer';
import { GetServerSideProps } from 'next';
import { useAuth } from '../../hooks/authcontext';

const StudentLanding = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading or not authenticated...</div>; // This will only be shown briefly
    }
  return (
    <Box height="100vh" display="flex" flexDirection="column" bg="gray.100">
      <Navbar />
      <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <VStack spacing={4} align="flex-start">
          <Heading as="h1" size="2xl">
            Reservation Page
          </Heading>
          <Text fontSize="lg">
            Use the Calendar to reserve a 3D printer for your project.
          </Text>
          <Link href='/student/printing' color='blue.400' _hover={{ color: 'blue.500' }}>
            <Button colorScheme="blue" size="lg">
              Make a Reservation
            </Button>
          </Link> 
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
};


export default StudentLanding;