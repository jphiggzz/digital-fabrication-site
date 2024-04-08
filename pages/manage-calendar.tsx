import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { useAuth } from '../hooks/authcontext';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

const ManageCalendar = () => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayClick = (value: Date) => {
    setSelectedDate(value);
    onOpen();
  };

  const handleRemoveDay = () => {
    // Logic to remove the day from availability
    onClose();
  };

  const calendarBackground = useColorModeValue('gray.50', 'gray.700');
  const calendarColor = useColorModeValue('black', 'white');

  return (
    <VStack align="start" spacing={6} p={5}>
    <Heading size="lg">Manage Calendar</Heading>
    <Flex justify="center" align="center" w="full">
      <Box w="100%" maxW="1000px" p={5} boxShadow="xl">
        <Calendar onClickDay={handleDayClick} className="react-calendar" />
      </Box>
    </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Availability</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Would you like to remove {selectedDate.toDateString()} from availability?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleRemoveDay}>
              Yes
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ManageCalendar;
