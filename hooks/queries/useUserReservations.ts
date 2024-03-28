import {useCollectionData} from "react-firebase-hooks/firestore";
import {reservationsCollection} from "@/firebase/firestore/collections/reservations";
import {query, where} from "@firebase/firestore";

const useUserReservations = (userId: string) => {

    const [reservations, loading, error] = useCollectionData(
        query(reservationsCollection, where("studentEmail", "==", userId))
    )

    return {
        reservations: reservations || [],
        loading,
        error
    }
}

export default useUserReservations;