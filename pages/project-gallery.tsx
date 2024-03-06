import { Box, Heading, SimpleGrid, Image, Text } from '@chakra-ui/react';
import Navbar from '@/components/Navbar'
import { SamplePhoto } from '@/assets/gallery-photos'

// sample data for projects
const projects = [
  { title: 'Project 1', imageUrl: SamplePhoto.src, description: 'Description of Project 1' },
  { title: 'Project 2', imageUrl: SamplePhoto.src, description: 'Description of Project 2' },
  { title: 'Project 3', imageUrl: SamplePhoto.src, description: 'Description of Project 3' },
];

const ProjectGalleryPage = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box p={8}>
        <Heading as="h1" mb={4}>
            Project Gallery
        </Heading>
        <SimpleGrid columns={3} spacing={10}>
            {projects.map((project, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px">
                <Image src={project.imageUrl} alt={project.title} />
                <Heading fontSize="xl" mt={4}>{project.title}</Heading>
                <Text mt={2}>{project.description}</Text>
            </Box>
            ))}
        </SimpleGrid>
        </Box>
    </Box>
  );
};

export default ProjectGalleryPage;
