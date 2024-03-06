import { Image, Text, Flex, Button, HStack, chakra, Link } from '@chakra-ui/react';
import React from 'react';

const CTA = 'Go to Homepage';

const data = [
  { label: 'Printers', href: '/printers' },
  { label: 'Resources', href: '/resources' },
  { label: 'Project Gallery', href: '/project-gallery' },
];

export default function Header() {
  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between" bg="6EC7E0">
        {/* Logo */}
        <Link href="/student-landing">
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

        {/* Call to action items */}
        <HStack>
            <Link href="https://www.digitalfabricationlab.com" isExternal>
                <Button>{CTA}</Button>
            </Link>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
