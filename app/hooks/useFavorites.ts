import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import { useLoginModal } from "./useLoginModal";

interface UseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}
const useFavorite = ({ listingId, currentUser }: UseFavorite) => {
    const router = useRouter();
    const { onOpen } = useLoginModal();

    const isFavorite = useMemo(() => {
        if (!currentUser) {
            return false;
        }

        return currentUser.favoriteIds?.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!currentUser) {
                return onOpen();
            }

            try {
                if (isFavorite) {
                    await axios.delete(`/api/favorites/${listingId}`);
                    toast.success("Removed from favorites");
                } else {
                    await axios.post(`/api/favorites/${listingId}`);
                    toast.success("Added to favorites");
                }
            } catch (error) {
                toast.error("Something went wrong");
            }

            router.refresh();
        },
        [currentUser, isFavorite, listingId, onOpen, router]
    );

    return {
        isFavorite,
        toggleFavorite,
    };
};

export default useFavorite;
