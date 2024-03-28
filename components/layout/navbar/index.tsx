import React from 'react';

import {Text, Flex, Button, HStack, Link, Icon} from '@chakra-ui/react';

import {adminRoutes, studentRoutes} from "@/components/layout/navbar/routes";
import {FaUserCircle} from "react-icons/fa";

interface Props {
    isAdmin?: boolean;
}

const Navbar: React.FC<Props> = ({ isAdmin }) => {
    return (
        <Flex
            w="100%"
            p={4}
            align="center"
            justify="space-between"
        >
            <Link
                href={isAdmin ? '/admin-landing' : '/student-landing'}
            >
                <Text
                    fontSize="lg"
                    fontWeight="bold"
                >
                    {isAdmin ? 'Admin Panel' : 'Digital Fabrication Lab'}
                </Text>
            </Link>
            <HStack
                spacing={8}
            >
                {
                    (isAdmin ? adminRoutes : studentRoutes).map((item, i) => (
                        <Link key={i} href={item.href} color="blue.400" _hover={{ color: 'blue.500' }}>
                            {item.label}
                        </Link>
                    ))
                }
            </HStack>
            <HStack>
                {
                    isAdmin ? (
                        <Icon as={FaUserCircle} w={6} h={6} />
                    ) : (
                        <Link
                            href="https://www.digitalfabricationlab.com"
                            isExternal
                        >
                            <Button>
                                Go to Homepage
                            </Button>
                        </Link>
                    )
                }
            </HStack>
        </Flex>
    );
}

export default Navbar;