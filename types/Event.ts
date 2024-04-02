import { Printer } from '@/types/Printer';
export interface Event {
    id: string;
    user: string;
    startTime: Date;
    endTime: Date;
    printer: Printer;
}