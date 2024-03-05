import React from 'react';
import { Button, Box, Heading, useToast } from '@chakra-ui/react';
import { addTimeSlot } from '../utils/testPopulate'; // Adjust the path as necessary

// This file is a page that allows an admin to add a time slot to the database.
// Currently under construction, probably doesn't work 

const AddTimeSlotPage = () => {
  const toast = useToast();

  const handleAddTimeSlot = async () => {
    console.log("Button clicked"); // Check if this gets logged
    const newTimeSlot = {
      label: '10:00 AM - 11:00 AM',
      startDateTime: '2024-03-04T10:00:00Z',
      endDateTime: '2024-03-04T11:00:00Z',
      reserved: false,
      studentEmail: null,
      printerId: null,
      printerName: null,
    };

    const success = await addTimeSlot(newTimeSlot);
    if (success) {
      toast({
        title: 'Success',
        description: 'Time slot added successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to add time slot',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxW="container.md" mx="auto">
      <Heading mb={4}>Add a Time Slot</Heading>
      <Button colorScheme="blue" onClick={handleAddTimeSlot}>
        Add Time Slot
      </Button>
    </Box>
  );
};

export default AddTimeSlotPage;
