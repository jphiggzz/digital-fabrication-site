import {Route} from "@/types/Route";

export const studentRoutes: Route[] = [
    {
        label: 'Reservations',
        href: '/printers'
    },
    {
        label: 'Resources',
        href: '/resources'
    },
    {
        label: 'Project Gallery',
        href: '/project-gallery'
    }
]

export const adminRoutes: Route[] = [
    {
        label: 'Printers',
        href: '/admin/printers'
    },
    {
        label: 'Reservations',
        href: '/admin/reservations'
    },
    {
        label: 'Project Gallery',
        href: '/admin/project-gallery'
    },
    {
        label: 'Resources',
        href: '/admin/resources'
    },
];

