'use client'
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

{ /* Landing page for students, currently only has reserve timeslot */}
{/*     but will eventually link to project gallery and info        */}

const StudentLanding = () => {
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
          <Link href='/printers' color='blue.400' _hover={{ color: 'blue.500' }}>
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