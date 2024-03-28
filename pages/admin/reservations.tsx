import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Text, Button, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, Flex, VStack
} from '@chakra-ui/react';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/AdminHeader';

const getRandomHours = () => {
  const hours = [];
  for (let i = 0; i < 9; i++) { // Adjusted for 9 cards (3 groups of 3)
    const randomHour = Math.floor(Math.random() * 11) + 8; // Random hour between 8 and 18 (6 PM)
    hours.push(randomHour);
  }
  return hours.sort((a, b) => a - b);
};

const ManageReservations = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hours, setHours] = useState<number[]>([]);  // Explicit type definition
  const printers = ["Voron 300", "Formlabs Form 3", "Makergear M3 ID"];
  const randomNames = ["alex", "jordan", "casey", "morgan", "taylor", "jessie", "cameron", "drew"];

  useEffect(() => {
    setHours(getRandomHours());
  }, []);

  const formatHour = (hour: number) => {
    const isPM = hour >= 12;
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:00 ${isPM ? 'PM' : 'AM'}`;
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="gray.50">
      <AdminHeader />
      <Box p={8}  >
        <Heading as="h1" size="lg" textAlign="center">{`Reservations for ${formattedDate}`}</Heading>
        <Text mt={2} textAlign="center">Click on a time slot to manage or delete the reservation.</Text>
      </Box>
      
      <Flex wrap="wrap" justifyContent="center" alignItems="center" p={8}>
        {hours.map((hour, index) => (
          <Box key={hour} borderWidth="1px" borderRadius="lg" overflow="hidden" m={2} p={4} w={["100%", "30%"]}
            bg="gray.100" boxShadow="md"
            _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out' }}>
            <VStack spacing={4} alignItems="center">
              <Heading as="h3" size="md">{formatHour(hour)}</Heading>
              <Text>Printer: {printers[index % printers.length]}</Text>
              <Text>{randomNames[index % randomNames.length]}@vanderbilt.edu</Text>
              <Button colorScheme="teal" onClick={onOpen}>Manage Reservation</Button>
            </VStack>
          </Box>
        ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Select an option below.
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Update Reservation
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Delete Reservation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Footer />
    </Box>
  );
};

export default ManageReservations;
