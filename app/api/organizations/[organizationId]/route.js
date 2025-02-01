import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  if (!params.organizationId)
    return new NextResponse("Organization id required", { status: 401 });

  try {
    const organization = await prisma.organization.findUnique({
    where: {
      id: params.organizationId,
    },
    include: {
      members: {
        include: {
          member: true,
        },
      },
      owner: true,
      tasks: true,
    },
  });

    if (!organization) {
      return new NextResponse("Organization not found", { status: 404 });
    }

    return NextResponse.json(organization);
  } catch (error) {
    console.log("ORGANIZATION_POST", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
