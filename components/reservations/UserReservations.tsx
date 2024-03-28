import React from 'react';

import {Heading, VStack, Text, SimpleGrid} from "@chakra-ui/react";

import Reservation from "@/components/reservations/Reservation";

import useUserReservations from "@/hooks/queries/useUserReservations";

const UserReservations: React.FC = () => {

    const { reservations } = useUserReservations("test@user.com");

    return (
        <VStack
            spacing={4}
            align='start'
        >
            <Heading>
                Reservations
            </Heading>
            {
                reservations.length > 0 ? (
                    <SimpleGrid
                        columns={3}
                        spacing={4}
                        w='100%'
                    >
                        {
                            reservations.map((reservation, index) => (
                                <Reservation
                                    key={index}
                                    reservation={reservation}
                                />
                            ))
                        }
                    </SimpleGrid>
                ) : (
                    <Text>
                        No reservations
                    </Text>
                )
            }
        </VStack>
    );
};

export default UserReservations;
