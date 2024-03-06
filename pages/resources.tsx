import { Box, Heading, List, ListItem, Link } from '@chakra-ui/react';
import Navbar from '@/components/Navbar'

const ResourcesPage = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box p={8}>
        <Heading as="h1" mb={4}>
            Resources
        </Heading>
        <List spacing={3}>
            <ListItem>
            <Link href="https://www.example.com/resource1" isExternal>
                Resource 1
            </Link>
            </ListItem>
            <ListItem>
            <Link href="https://www.example.com/resource2" isExternal>
                Resource 2
            </Link>
            </ListItem>
            <ListItem>
            <Link href="https://www.example.com/resource3" isExternal>
                Resource 3
            </Link>
            </ListItem>
        </List>
        </Box>
    </Box>
  );
};

export default ResourcesPage;
