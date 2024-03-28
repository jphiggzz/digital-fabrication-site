import { Box, Heading, SimpleGrid, Image, Text, Link, Button } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Boat, CupHolder, Dinosaur } from '@/assets/gallery-photos';
import AdminHeader from '@/components/AdminHeader';

// sample data for projects
const projects = [
  { title: 'Boat', imageUrl: Boat.src, description: 'Edit this Print' },
  { title: 'Cup Holder', imageUrl: CupHolder.src, description: 'Edit this Print' },
  { title: 'Dinosaur', imageUrl: Dinosaur.src, description: 'Edit this Print' },
];

const AdminProjectGalleryPage = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column" bg="gray.100">
        <AdminHeader />
        <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column">
          <Heading as="h1" mb={4}>
              Admin Project Gallery
          </Heading>
          <SimpleGrid columns={3} spacing={10}>
              {projects.map((project, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px" bg="white">
                  <Image src={project.imageUrl} alt={project.title} />
                  <Heading fontSize="xl" mt={4}>{project.title}</Heading>
                  <Link href="/edit" color="blue.400" _hover={{ color: 'blue.500' }}>
                    <Text mt={2}>{project.description}</Text>
                  </Link>
              </Box>
              ))}
          </SimpleGrid>
          <Button mt={6} alignSelf="center" colorScheme="blue">
            Add Print
          </Button>
        </Box>
        <Footer />
    </Box>
  );
};

export default AdminProjectGalleryPage;
