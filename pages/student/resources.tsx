import { Box, Heading, SimpleGrid, Text, Link, Button } from '@chakra-ui/react';
import Navbar from '@/components/StudentHeader';
import Footer from '@/components/Footer';
import useResources from '@/hooks/queries/useResources'; // Import the hook for fetching resources from Firestore

const ResourcesPage = () => {
    const { resources, loading, error } = useResources(); // Use the hook to get resources

    if (loading) return <Box>Loading...</Box>; // Loading state
    if (error) return <Box>Error loading resources. Please try again later.</Box>; // Error state

    return (
        <Box height="100vh" display="flex" flexDirection="column" bg="gray.100">
            <Navbar />
            <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column">
            <Heading as="h1" mb={4}>
                Resources
            </Heading>
            <SimpleGrid columns={2} spacing={10}> {/* Adjusted column count and spacing */}
                {resources.map((resource, index) => (
                <Box key={index} p={5} shadow="md" borderWidth="1px" bg="white" display="flex" flexDirection="column" justifyContent="space-between" minHeight="200px">
                    <Box>
                        <Heading fontSize="xl" mb={2}>
                            <Link href={resource.url} isExternal>
                                {resource.name}
                            </Link>
                        </Heading>
                        <Text mb={4}>{resource.description}</Text>
                    </Box>
                    <Button colorScheme="blue" as={Link} href={resource.url} isExternal textAlign="center" mt="auto">
                        Open
                    </Button>
                </Box>
                ))}
            </SimpleGrid>
            </Box>
            <Footer />
        </Box>
    );
};

export default ResourcesPage;
