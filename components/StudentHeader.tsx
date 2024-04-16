import { Text, Flex, Button, HStack, chakra, Link, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaUser } from 'react-icons/fa';

const data = [
    { label: 'Reservations', href: '/student/printing' },
    { label: 'Resources', href: '/student/resources' },
    { label: 'Project Gallery', href: '/student/project-gallery' },
];

export default function Header() {
  return (
    <chakra.header id="header" bg="white">
          <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        {/* Logo */}
        <Link href="/student/landing">
          <Text fontSize="lg" fontWeight="bold">
          Digital Fabrication Lab
          </Text>
        </Link>
        {/* Nav Items */}
        <HStack as="nav" spacing="5">
          {data.map((item, i) => (
            <Link key={i} href={item.href} color="blue.400" _hover={{ color: 'blue.500' }}>
              {item.label}
            </Link>
          ))}
        </HStack>
        {/* Call to action */}
            <IconButton
                aria-label="Profile"
                icon={<FaUser />}
                variant="ghost"
                  onClick={() => window.location.href = '/student/profile'} // Redirect to /profile
            />
      </Flex>
    </chakra.header>
  );
}
