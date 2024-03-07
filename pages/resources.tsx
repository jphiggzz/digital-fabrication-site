import { Box, Heading, SimpleGrid, Text, Link } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const resources = [
  { title: 'Resource 1', link: 'https://www.example.com/resource1', description: 'Description of Resource 1' },
  { title: 'Resource 2', link: 'https://www.example.com/resource2', description: 'Description of Resource 2' },
  { title: 'Resource 3', link: 'https://www.example.com/resource3', description: 'Description of Resource 3' },
];

const ResourcesPage = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column" bg="gray.100">
        <Heading as="h1" mb={4}>
            Resources
        </Heading>
        <SimpleGrid columns={3} spacing={10}>
            {resources.map((resource, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" bg="white">
                <Heading fontSize="xl" mb={2}>
                <Link href={resource.link} isExternal>
                    {resource.title}
                </Link>
                </Heading>
                <Text>{resource.description}</Text>
            </Box>
            ))}
        </SimpleGrid>
        </Box>
        <Footer />
    </Box>
  );
};

export default ResourcesPage;
