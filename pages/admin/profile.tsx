import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Flex, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import Navbar from '@/components/AdminHeader';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/authcontext';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firestore/index';
import AddAdminModal from '@/components/addAdminModal';
import { Admin } from '@/types/Admin';

// ProfilesPage Component for Admin
const AdminPage = () => {
    // Get signOut from the useAuth hook
    const { signOut } = useAuth();
    // Initialize admins state
    const [admins, setAdmins] = useState<Admin[]>([]);
    // Setup Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Initialize toast
    const toast = useToast();
    // Initialize router with useRouter hook
    const router = useRouter();

    // Hook to fetch list of admin
    useEffect(() => {
        const fetchAdmins = async () => {
            const querySnapshot = await getDocs(collection(db, "adminUsers"));
            const adminsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name || 'No Name Provided',
                email: doc.data().email || 'No Email Provided'
            }));
            setAdmins(adminsArray);
        };
        fetchAdmins();
    }, []);

    // Async function to handle admin addition
    const handleAddAdmin = async (newAdmin: { email: string; name: string }) => {
        const { email, name } = newAdmin;
        try {
            await setDoc(doc(db, "adminUsers", email), { name, email });
            const newAdminWithId = { id: email, email, name }; // Include the 'id' property based on the email
            setAdmins([...admins, newAdminWithId]);
            toast({
                title: "Admin added.",
                description: "A new admin has been successfully added.",
                status: "success",
                duration: 5000,
                isClosable: true
            });
            setIsModalOpen(false);
        } catch (error) {
            toast({
                title: "Failed to add admin.",
                description: `Error: ${error}`,
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
    };


    // Async function to handle admin deletion
    const handleDeleteAdmin = async (id: string) => {
        try {
            await deleteDoc(doc(db, "adminUsers", id));
            setAdmins(admins.filter(admin => admin.id !== id));
            toast({
                title: "Admin deleted.",
                description: "The admin has been successfully deleted.",
                status: "info",
                duration: 5000,
                isClosable: true
            });
        } catch (error) {
            toast({
                title: "Failed to delete admin.",
                description: `Error: ${error}`,
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
    };

    // Async function to logout the user
    const handleLogout = async () => {
        await signOut(); // Call signOut function
        router.push('/'); // Redirect user to homepage after logging out
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        })
    };

    // Render the page
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Flex flex="1" p="4" overflowY="auto" alignItems="start">
                <Box p={8}>
                    <Heading as="h1" mb={4}>Admin Management</Heading>
                    <Button colorScheme="blue" onClick={() => setIsModalOpen(true)} leftIcon={<AddIcon />}>Add Admin</Button>
                    <Table variant="simple" mt={4}>
                        <Thead>
                            <Tr>
                                <Th>Email</Th>
                                <Th>Name</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {admins.map(admin => (
                                <Tr key={admin.id}>
                                    <Td>{admin.email}</Td>
                                    <Td>{admin.name}</Td>
                                    <Td>
                                        <IconButton icon={<DeleteIcon />} aria-label="Delete admin" onClick={() => handleDeleteAdmin(admin.id)} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <Button colorScheme="red" onClick={handleLogout} mt={4}>Logout</Button>
                </Box>
            </Flex>
            <Footer />
            {isModalOpen && <AddAdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addAdmin={handleAddAdmin} />}
        </Box>
    );
};

export default AdminPage;
