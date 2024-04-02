import { Text, Flex, Button, HStack, chakra, Link, Icon } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa'; // Import the profile icon
import React from 'react';

const adminData = [
  { label: 'Printers', href: '/admin/printers' },
  { label: 'Reservations', href: '/admin/reservations' },
  { label: 'Project Gallery', href: '/admin/project-gallery' },
  { label: 'Resources', href: '/admin/resources' },
];

export default function AdminHeader() {
  return (
    <chakra.header id="admin-header" bg="white">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        {/* Admin Landing Link */}
        <Link href="/admin-landing">
          <Text fontSize="lg" fontWeight="bold">
            Admin Panel
          </Text>
        </Link>
        {/* Nav Items */}
        <HStack as="nav" spacing="5">
          {adminData.map((item, i) => (
            <Link key={i} href={item.href} color="blue.400" _hover={{ color: 'blue.500' }}>
              {item.label}
            </Link>
          ))}
        </HStack>
        {/* Profile Icon */}
        <Button as={Link} href="/admin/profile">
          <Icon as={FaUserCircle} w={6} h={6} data-testid="profile-icon" />
        </Button>
      </Flex>
    </chakra.header>
  );
}
