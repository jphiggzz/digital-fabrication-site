export interface TimeSlot {
    id?: string; // Make id property optional
    label: string;
    reserved: boolean;
}


export interface Printer {
    name: string;
}

export type PrinterType = 'filament' | 'powder' | 'plastic';

export interface ReservedSlot extends TimeSlot {
    id: string;
    printerId: PrinterType;
    studentEmail: string;
}
