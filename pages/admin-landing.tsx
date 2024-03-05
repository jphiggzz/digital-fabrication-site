import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import db from '@/firebase/firestore/index'; // Adjust the path as necessary
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import { TimeSlot } from '@/firebase/firestore/collections';
import { timeSlotConverter } from '@/firebase/firestore/collectionConverter';

import {
  Box, Heading, SimpleGrid, Text, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, useDisclosure, Button, useToast,
} from '@chakra-ui/react';

const TimeSelection = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchTimeSlots = async () => {
      const q = query(collection(db, "timeslots").withConverter(timeSlotConverter));
      const querySnapshot = await getDocs(q);
      const slots = querySnapshot.docs.map(doc => doc.data());
      setTimeSlots(slots);
    };

    fetchTimeSlots();
  }, []);

  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    onOpen(); // Open the modal
  };

  const handleCreateEvent = async () => {
    if (!selectedTimeSlot || selectedTimeSlot.reserved) return;

    const session = await getSession();
    const accessToken = session?.accessToken;

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

    // Update Firestore document to mark the slot as reserved
    const timeSlotDoc = doc(db, "timeslots", selectedTimeSlot.id).withConverter(timeSlotConverter);
    await updateDoc(timeSlotDoc, {
      reserved: true,
      studentEmail: session.user?.email // Assuming session has user info
    });

    // Additional logic for Google Calendar event creation can be added here

    onClose(); // Close the modal on success
    toast({
      title: 'Reservation Confirmed',
      description: 'Your time slot reservation has been confirmed.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    // Update local state to reflect the reservation
    setTimeSlots(prev => prev.map(slot => slot.id === selectedTimeSlot.id ? { ...slot, reserved: true } : slot));
  };

  return (
    <Box p={8} maxW="container.md" mx="auto">
      <Heading mb={4}>Select a Time Slot</Heading>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={5}>
        {timeSlots.map((timeSlot) => (
          <Box
            key={timeSlot.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg={timeSlot.reserved ? 'gray.300' : 'white'}
            _hover={{ bg: 'blue.100', cursor: 'pointer' }}
            onClick={() => !timeSlot.reserved && handleSelectTimeSlot(timeSlot)}
          >
            {timeSlot.label}
          </Box>
        ))}
      </SimpleGrid>

      {/* Modal for confirmation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Your Reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTimeSlot ? (
              <Text>
                Are you sure you want to reserve the following time slot? <br />
                <strong>{selectedTimeSlot.label}</strong>
              </Text>
            ) : (
              <Text>No time slot selected.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateEvent}>
              Confirm Reservation
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TimeSelection;
