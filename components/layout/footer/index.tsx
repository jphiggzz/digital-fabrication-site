import React from 'react';
import {Flex, Text} from "@chakra-ui/react";

const Footer = () => {
    return (
        <Flex
            as="footer"
            w="100%"
            px={6}
            py={4}
            justifyContent="space-between"
            alignItems="center"
            bg="white"
        >
            <Text>
                Olin Hall, Vanderbilt University
            </Text>
            <Text>
                Chemical and Bio-molecular Engineering
            </Text>
        </Flex>
    );
};

export default Footer;
