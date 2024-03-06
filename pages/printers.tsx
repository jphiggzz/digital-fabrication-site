import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Navbar from '@/components/Navbar'
import 


// sample data for printers
const printers = [
  { name: 'Voron', imageUrl: SamplePhoto.src, status: 'Available' },
  { name: 'MakerGear M3', status: 'In Use' },
  { name: 'Form 3', status: 'Available' },
];

const PrintersPage = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box p={8}>
          <Heading as="h1" mb={4}>
              Printers
          </Heading>
          <SimpleGrid columns={3} spacing={10}>
              {printers.map((printer, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px">
                  <Image src={printer.imageUrl} alt={project.title} />
                  <Heading fontSize="xl">{printer.name}</Heading>
                  <Text mt={4}>Status: {printer.status}</Text>
              </Box>
              ))}
          </SimpleGrid>
        </Box>
    </Box>
  );
};

export default PrintersPage;
