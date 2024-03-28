import React from 'react';

import {Box, Button, Heading, Link, SimpleGrid, Text} from "@chakra-ui/react";

import useResources from "@/hooks/queries/useResources";

interface Props {
    isAdmin?: boolean;
}

const Resources: React.FC<Props> = ({ isAdmin }) => {

    const { resources } = useResources();

    return (
        <Box p={8} maxW="container.md" mx="auto" flexGrow={1} display="flex" flexDirection="column">
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
            {
                isAdmin && (
                    <Button mt={6} alignSelf="center" colorScheme="blue">
                        Add Resource
                    </Button>
                )
            }
        </Box>
    );
};

export default Resources;
