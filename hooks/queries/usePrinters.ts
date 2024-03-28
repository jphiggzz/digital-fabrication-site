import {useState} from "react";

import {Printer} from "@/types/Printer";
import {Form3, MakerGearM3, Voron} from "@/assets/printer-photos";

const samplePrinters : Printer[] = [
    {
        name: 'Voron',
        imageUrl: Voron.src,
        description: 'Voron is a 3D printer that is known for its speed and precision.',
        id: '1'
    },
    {
        name: 'MakerGear M3',
        imageUrl: MakerGearM3.src,
        description: 'MakerGear M3 is a 3D printer that is known for its reliability and ease of use.',
        id: '2'
    },
    {
        name: 'Form 3',
        imageUrl: Form3.src,
        description: 'Form 3 is a 3D printer that is known for its high resolution and quality.',
        id: '3'
    }
];

const usePrinters = () => {
    const [printers, setPrinters] = useState<Printer[]>(samplePrinters);

    return {
        printers,
        setPrinters
    }
}

export default usePrinters;