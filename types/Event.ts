import { Printer } from '@/types/Printer';
export interface Event {
    id: string;
    user: string;
    startTime: Date; //change to Date
    endTime: Date; //change to Date
    printer: string;
    printName: string;
}
//function for date conversion for events
export function formatDateToString(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensures two digits
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();

    return `${hours}:${minutes} ${month}/${day}`;
}