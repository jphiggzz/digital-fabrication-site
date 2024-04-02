
import { useState } from 'react';
import { addDays, subDays, isWithinInterval } from 'date-fns';

type Direction = 'next' | 'prev';

export const useDateNavigation = (initialDate = new Date()) => {
    const [selectedDate, setSelectedDate] = useState(initialDate);

    const startDate = initialDate;
    const endDate = addDays(initialDate, 7);

    const navigateDay = (direction: Direction) => {
        const newDate = direction === 'next' ? addDays(selectedDate, 1) : subDays(selectedDate, 1);
        if (isWithinInterval(newDate, { start: startDate, end: endDate })) {
            setSelectedDate(newDate);
        } else {
            // Optionally, provide feedback to the user that they can't navigate further
            console.log('Cannot navigate outside the two-week window.');
        }
    };

    return { selectedDate, navigateDay };
};