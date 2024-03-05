'use client'
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

const Reserve = () => {
  return (
    <Box p={8} maxW="container.md" mx="auto">
      <VStack spacing={4} align="flex-start">
        <Heading as="h1" size="2xl">
          Reservation Page
        </Heading>
        <Text fontSize="lg">
          Use the Calendar to reserve a 3D printer for your project.
        </Text>
        <Link href='/time-selection' color='blue.400' _hover={{ color: 'blue.500' }}>
          <Button colorScheme="blue" size="lg">
            Make a Reservation
          </Button>
    </Link> 
      </VStack>
    </Box>
  );
};

export default Reserve;