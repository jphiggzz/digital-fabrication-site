import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';

export async function requireAuth(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login', // Redirect to the login page if user is not authenticated
                permanent: false,
            },
        };
    }
    return {
        props: {}, // Return an empty object to indicate that the page can be accessed
    };
}

