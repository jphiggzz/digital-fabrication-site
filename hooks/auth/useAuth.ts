import {useSession} from "next-auth/react";

const useAuth = () => {

    const { data } = useSession();

    return {
        user: data?.user,
    }

}

export default useAuth;