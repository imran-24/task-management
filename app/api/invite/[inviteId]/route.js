import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const body = await req.json();
  const { response, memberId, organizationId } = body;
  const status = response ? "APPROVED" : "REJECTED";
  if (!params.inviteId)
    return new NextResponse("InviteId is required", { status: 400 });

  try {
    const updatedInvite = await prisma.invite.update({
      where: {
        id: params.inviteId,
      },
      data: {
        status,
      },
    });

    if (status === "APPROVED") {
      await prisma.organizationUser.create({
        data: {
          member: {
            connect: { id: memberId },
          },
          organization: {
            connect: {
              id: organizationId,
            },
          },
        },
      });
    }
    
    return NextResponse.json(updatedInvite);
  } catch (error) {
    console.log("INVITE_UPDATE", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
