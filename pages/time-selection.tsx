import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
} from '@chakra-ui/react';

interface TimeWindow {
  id: number;
  label: string;
  startDateTime: string; // ISO string for start time
  endDateTime: string; // ISO string for end time
}

const TimeSelection = () => {
  // Add start and end ISO strings for each time window for simplicity
  const timeWindows: TimeWindow[] = [
    { id: 1, label: '9:00 AM - 10:00 AM', startDateTime: '2024-03-20T09:00:00-07:00', endDateTime: '2024-03-20T10:00:00-07:00' },
    { id: 2, label: '10:00 AM - 11:00 AM', startDateTime: '2024-03-20T10:00:00-07:00', endDateTime: '2024-03-20T11:00:00-07:00' },
  ];

  const [selectedTimeWindow, setSelectedTimeWindow] = useState<TimeWindow | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSelectTimeWindow = (timeWindow: TimeWindow) => {
    setSelectedTimeWindow(timeWindow);
    onOpen(); // Open the modal
  };

  const handleCreateEvent = async () => {
    if (!selectedTimeWindow) return;

    // Here, you'd fetch the session to get the access token
    // For demonstration, this is a mocked process
    const session = await getSession();
    const accessToken = session?.accessToken; // Assuming your session object has an accessToken

    if (!accessToken) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create an event.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const eventDetails = {
      summary: '3D Printer Reservation',
      start: {
        dateTime: selectedTimeWindow.startDateTime,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: selectedTimeWindow.endDateTime,
        timeZone: 'America/Los_Angeles',
      },
    };

    try {
      const response = await fetch('/api/calendar/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          event: eventDetails,
        }),
      });

      if (!response.ok) throw new Error('Failed to create calendar event');

      onClose(); // Close the modal on success
      toast({
        title: 'Event Created',
        description: 'Your reservation has been added to the calendar.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an issue creating your event.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxW="container.md" mx="auto">
      <Heading mb={4}>Select a Time Window</Heading>
      <Text fontSize="md" mb={6}>
        This sucks but it will make an event on your personal Google Calendar for March 20 if you wanna check.
      </Text>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={5}>
        {timeWindows.map((timeWindow) => (
          <Box
            key={timeWindow.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            _hover={{ bg: 'blue.100', cursor: 'pointer' }}
            onClick={() => handleSelectTimeWindow(timeWindow)}
          >
            {timeWindow.label}
          </Box>
        ))}
      </SimpleGrid>

      {/* Modal to show selected time window and confirm event creation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Your Time Window</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTimeWindow ? (
              <Text>You have selected: {selectedTimeWindow.label}. Do you want to create this event?</Text>
            ) : (
              <Text>No time window selected.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateEvent}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TimeSelection;
