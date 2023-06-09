import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="You must be signed in to view this page."
                />
            </ClientOnly>
        );
    }

    const favorites = await getFavoriteListings();

    if (favorites.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient favorites={favorites} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default FavoritesPage;
