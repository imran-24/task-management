import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      title,
      description,
      priority,
      deadline,
      assignedToId,
      organizationId,
    } = await req.json();

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        deadline: new Date(deadline),
        assignedToId, // Using unary plus operator is faster than parseInt
        organizationId: organizationId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("[TASK_POST]", error); // Better error logging
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
