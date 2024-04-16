import { useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Link, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react';
import AdminHeader from '@/components/AdminHeader';
import Footer from '@/components/Footer';
import useAddResource from '@/hooks/mutators/useAddResource'; // Assuming this hook is properly implemented
import useResources from '@/hooks/queries/useResources'; // Assuming this hook is properly implemented
import { deleteResource } from '@/services/resource';

const AdminResourcesPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { name, setName, description, setDescription, url, setUrl, onSubmit } = useAddResource();
    const { resources, loading, error } = useResources(); // Assuming this hook is properly implemented

    const handleSubmit = async () => {
        await onSubmit();
        onClose(); // Close the modal after submission
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteResource(id);
            alert('Resource deleted successfully!');
        } catch (error) {
            console.error('Failed to delete resource:', error);
            alert('Error deleting resource.');
        }
    };

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error loading resources. Please try again later.</Box>;

    return (
        <Box height="100vh" display="flex" flexDirection="column" bg="gray.100">
            <AdminHeader />
            <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column">
                <Heading as="h1" mb={4}>
                    Admin Resources
                </Heading>
                <SimpleGrid columns={2} spacing={10}>
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
                            <Button colorScheme="red" mt="auto" onClick={() => handleDelete(resource.id)}>
                                Delete Resource
                            </Button>
                        </Box>
                    ))}
                </SimpleGrid>
                <Button mt={6} alignSelf="center" colorScheme="blue" onClick={onOpen}>
                    Add Resource
                </Button>
            </Box>
            <Footer />

            {/* Modal for adding a new resource */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Resource</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Resource name" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Resource description" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>URL</FormLabel>
                            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Resource URL" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AdminResourcesPage;