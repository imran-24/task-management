import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, firebaseId } = body;

    if (!email || typeof email != "string")
      return new NextResponse("Email is required", { status: 400 });
    if (!name || typeof name != "string")
      return new NextResponse("Name is required", { status: 400 });
    if (!firebaseId || typeof firebaseId != "string")
      return new NextResponse("firebaseId is required", { status: 400 });

    const user = await prisma.user.create({
      data: {
        firebaseId,
        email,
        name,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("USER_POST", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
