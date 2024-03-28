import React from 'react';

import {Box} from "@chakra-ui/react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface Props {
    children: React.ReactNode;
    isAdmin?: boolean;
}

const Layout: React.FC<Props> = ({ children, isAdmin}) => {
    return (
        <Box
            minH="100vh"
            w={'100vw'}
            display="flex"
            flexDirection="column"
        >
            <Navbar
                isAdmin={isAdmin}
            />
            <Box
                flex="1"
                p={8}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
