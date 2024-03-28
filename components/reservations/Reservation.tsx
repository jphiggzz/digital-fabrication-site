import React from 'react';

import {Card} from "@chakra-ui/card";

import {Reservation} from "@/types/Reservation";
import {Text} from "@chakra-ui/react";

interface Props {
    reservation: Reservation
}

const Reservation: React.FC<Props> = ({ reservation }) => {
    return (
        <Card
            p={4}
            shadow="md"
        >
            <Text
                fontWeight='bold'
                fontSize={'xl'}
            >
                { reservation.label }
            </Text>
            <Text
                fontWeight={'semibold'}
            >
                { reservation.printerName }
            </Text>
            <Text>
                { new Date(reservation.startDateTime).toLocaleTimeString() } - { new Date(reservation.endDateTime).toLocaleTimeString() }
            </Text>
        </Card>
    );
};

export default Reservation;
