import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { z } from "zod";

const postBodyValidator = z.object({
    listingId: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    totalPrice: z.number(),
});

type PostBody = z.infer<typeof postBodyValidator>;

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { success } = postBodyValidator.safeParse(body);
    if (!success) {
        return new Response("Invalid request payload", { status: 422 });
    }
    const { listingId, startDate, endDate, totalPrice } = body as PostBody;

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}
