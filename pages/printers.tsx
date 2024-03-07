import { Box, Heading, SimpleGrid, Image, Text } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Form3, Form3L, Fuse1, MakerGearM3, SintratecKit,  Voron } from '@/assets/printer-photos';
import { setDefaultResultOrder } from 'dns';


// sample data for printers
const printers = [
  { name: 'Voron', imageUrl: Voron.src, status: 'Available' },
  { name: 'MakerGear M3', imageUrl: MakerGearM3.src, status: 'In Use' },
  { name: 'Form 3', imageUrl: Form3.src, status: 'Available' },
];

const PrintersPage = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column" bg="gray.100">
        <Navbar />
        <Box p={8}>
          <Heading as="h1" mb={4}>
              Printers
          </Heading>
          <SimpleGrid columns={3} spacing={10}>
              {printers.map((printer, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px" bg="gray.50">
                  <Image src={printer.imageUrl} alt={printer.name} />
                  <Heading fontSize="xl">{printer.name}</Heading>
                  <Text mt={4}>Status: {printer.status}</Text>
              </Box>
              ))}
          </SimpleGrid>
        </Box>
        <Footer />
    </Box>
  );
};

export default PrintersPage;
