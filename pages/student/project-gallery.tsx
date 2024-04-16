import { Box, Heading, SimpleGrid, Image, Text, Link } from '@chakra-ui/react';
import Navbar from '@/components/StudentHeader';
import Footer from '@/components/Footer';
import useProjects from "@/hooks/queries/useProjects";

const ProjectGalleryPage = () => {

    const { projects } = useProjects();

  return (
    <Box height="100vh" display="flex" flexDirection="column" bg="gray.100">
        <Navbar />
        <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column">
          <Heading as="h1" mb={4}>
              Project Gallery
          </Heading>
          <SimpleGrid columns={3} spacing={10}>
              {projects.map((project, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px" bg="white">
                  <Image src={project.imageUrl} alt={project.title} />
                  <Heading fontSize="xl" mt={4}>{project.title}</Heading>
                    <Text mt={2}>{project.description}</Text>
              </Box>
              ))}
          </SimpleGrid>
        </Box>
        <Footer />
    </Box>
  );
};

export default ProjectGalleryPage;
