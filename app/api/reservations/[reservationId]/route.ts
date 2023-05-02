import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Params {
    reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
        return new Response("Invalid reservationId", { status: 400 });
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } },
            ],
        },
    });

    return NextResponse.json(reservation);
}
