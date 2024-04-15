'use client'
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/AdminHeader';
import { useAuth } from '../hooks/authcontext';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

// test deploy thing 

const AdminLanding = () => {
    const { user, isAdmin } = useAuth();
    const router = useRouter();

    if (!user) {
        return <div>Loading or not authenticated...</div>; // This will only be shown briefly
    }

    useEffect(() => {
        if (!isAdmin) {
            router.push('/'); // Redirect to home if not admin
            return;
        }
    }, [isAdmin, router]);

  return (
    <Box height="100vh" display="flex" flexDirection="column" bg="gray.200">
      <AdminHeader />
      <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <VStack spacing={4} align="center">
          <Heading as="h1" size="2xl" textAlign="center">
            Admin Landing
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Hub for all admin functions (manage time slots, reservations, and printers here)
          </Text>
          <Link href='/manage-reservations' color='blue.400' _hover={{ color: 'blue.500' }}>
            <Button colorScheme="blue" size="lg">
              Manage Reservations
            </Button>
          </Link>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLanding;
