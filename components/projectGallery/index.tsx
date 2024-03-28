import React from 'react';

import {Box, Button, Heading, Image, Link, SimpleGrid, Text} from "@chakra-ui/react";
import useProjects from "@/hooks/queries/useProjects";

interface Props {
    isAdmin?: boolean;
}

const ProjectGallery: React.FC<Props> = ({ isAdmin }) => {

    const { projects } = useProjects();

    return (
        <Box
            p={8}
            maxW="container.md"
            mx="auto"
            flexGrow={1}
            display="flex"
            flexDirection="column"
        >
            <Heading
                as="h1"
                mb={4}
            >
                Project Gallery
            </Heading>
            <SimpleGrid
                columns={3}
                spacing={10}
            >
                {
                    projects.map((project, index) => (
                        <Box
                            key={index}
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            bg="white"
                        >
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                            />
                            <Heading
                                fontSize="xl"
                                mt={4}
                            >
                                {project.title}
                            </Heading>
                            <Link
                                color="blue.400"
                                _hover={{ color: 'blue.500' }}
                            >
                                <Text mt={2}>{project.description}</Text>
                            </Link>
                        </Box>
                    ))
                }
            </SimpleGrid>
            {
                isAdmin && (
                    <Button
                        mt={4}
                        colorScheme="blue"
                    >
                        Add Project
                    </Button>
                )
            }
        </Box>
    );
};

export default ProjectGallery;
