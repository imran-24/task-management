import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { name, ownerId } = body;

  if (!name || typeof name != "string")
    return new NextResponse("Name is required", { status: 400 });
  if (!ownerId || typeof ownerId != "string")
    return new NextResponse("OwnerId is required", { status: 400 });
  try {
    const organization = await prisma.organization.create({
      data: {
        name,
        ownerId
      },
    });
    return NextResponse.json(organization);
  } catch (error) {
    console.log("ORGANIZATION_POST", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

