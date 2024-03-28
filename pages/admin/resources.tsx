import { Box, Heading, SimpleGrid, Text, Link, Button } from '@chakra-ui/react';

import Layout from "@/components/layout";

const resources = [
  { title: 'Resource 1', link: 'https://www.example.com/resource1', description: 'Description of Resource 1' },
  { title: 'Resource 2', link: 'https://www.example.com/resource2', description: 'Description of Resource 2' },
  { title: 'Resource 3', link: 'https://www.example.com/resource3', description: 'Description of Resource 3' },
];

const AdminResourcesPage = () => {
  return (
    <Layout
        isAdmin
    >
        <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column">
        <Heading as="h1" mb={4}>
            Admin Resources
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
                <Button mt={2} colorScheme="blue" mr={2}>
                    Edit Resource
                </Button>
            </Box>
            ))}
        </SimpleGrid>
        <Button mt={6} alignSelf="center" colorScheme="blue">
            Add Resource
        </Button>
        </Box>
    </Layout>
  );
};

export default AdminResourcesPage;
