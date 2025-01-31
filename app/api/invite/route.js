import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { organizationId, userId } = body;

    if (!organizationId || typeof organizationId != "string")
      return new NextResponse("OrganizationId is required", { status: 400 });
    if (!userId || typeof userId != "string")
      return new NextResponse("UserId is required", { status: 400 });

    const invite = await prisma.invite.create({
      data: {
        user: {
          connect: { id: userId },
        },
        organization: {
          connect: { id: organizationId },
        },
        // status: "PENDING",
        // expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
    });

    return NextResponse.json(invite);
  } catch (error) {
    console.log("INVITE_POST", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

