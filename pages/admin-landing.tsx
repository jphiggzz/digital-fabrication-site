import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';

// Landing page for admin, currently only has links to manage time slots, reservations, and printers
// but will eventually link to project gallery and info
// Need react components for each of these pages

const AdminLanding = () => {
    return (
        <Box p={8} maxW="container.md" mx="auto">
      <VStack spacing={4} align="flex-start">
        <Heading as="h1" size="2xl">
          Admin Landing
        </Heading>
        <Text fontSize="lg">
            Hub for all admin functions (manage time slots, reservations, and printers here)
        </Text>
        { /* Button for managing the Calendar */}
        <Link href='/manage-calendar' color='blue.400' _hover={{ color: 'blue.500' }}>
          <Button colorScheme="blue" size="lg">
            Manage Calendar
          </Button>
        </Link>   
        { /* Button for managing Reservations */}
        <Link href='/manage-reservations' color='blue.400' _hover={{ color: 'blue.500' }}>
          <Button colorScheme="blue" size="lg">
            Manage Reservations
          </Button>
        </Link>
        { /* Button for managing Printers */}
        <Link href='/manage-printers' color='blue.400' _hover={{ color: 'blue.500' }}>
          <Button colorScheme="blue" size="lg">
            Manage Printers
          </Button>
        </Link>   
      </VStack>
    </Box>
    );
    };

export default AdminLanding;