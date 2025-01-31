import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const firebaseId = params.firebaseId;
    const user = await prisma.user.findUnique({
      where: {
        firebaseId,
      },
      include: {
        ownedOrgs: {
          include: {
            members: true,
            owner: true,
            tasks: true,
          },
        },
        organizations: {
          include: {
            organization: {
              include: {
                members: true,
                owner: true,
                tasks: true,
              },
            },
          },
        },
        tasks: true,
      },
    });

    console.log(user);

    if (!user) {
      return new NextResponse("User not Found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("USER_POST", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
