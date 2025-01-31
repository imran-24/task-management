import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  if (!params.userId)
    return new NextResponse("UserId is required", { status: 400 });

  console.log(params.userId)
  try {
    const pendingInvites = await prisma.invite.findMany({
      where: {
        userId: params.userId,
        status: "PENDING",
      },
      include:{
        organization: true,
        user: true
      }
    });

    console.log(pendingInvites);

    return NextResponse.json(pendingInvites);
  } catch (error) {
    console.log("INVITE_GET", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
